const Redis = require("ioredis");
const redis = new Redis(); // Connects to your Memurai/Redis
const runPythonAudit = require("./path_to_the_code_you_just_sent"); 

async function startWorker() {
    console.log("🚀 FairTrace Worker is active and waiting for jobs...");

    while (true) {
        // 1. Try to "Pop" a job from the Redis list named 'audit_queue'
        const jobData = await redis.lpop("audit_queue");

        if (jobData) {
            const session = JSON.parse(jobData);
            console.log(`📦 Found job for Session: ${session.sessionId}. Starting Python...`);

            try {
                // 2. Call the spawn logic you provided
                const result = await runPythonAudit(session);
                
                // 3. Store the result back in Redis so the Frontend can see it
                await redis.set(`result:${session.sessionId}`, JSON.stringify(result));
                console.log(`✅ Audit Complete for ${session.sessionId}`);
            } catch (err) {
                console.error("❌ Python Execution Failed:", err);
            }
        }

        // 4. Wait for 2 seconds before checking the queue again (Prevents 'Clean Exit')
        await new Promise(resolve => setTimeout(resolve, 2000));
    }
}

startWorker().catch(err => {
    console.error("Worker crashed:", err);
    process.exit(1);
});