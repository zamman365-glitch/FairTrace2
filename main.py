from fastapi import FastAPI, UploadFile, File, Form
import pandas as pd
import numpy as np

app = FastAPI()


# ---- Metric: Demographic Parity Difference ----
def demographic_parity_difference(y, sensitive):
    group0 = y[sensitive == 0]
    group1 = y[sensitive == 1]

    rate0 = np.mean(group0) if len(group0) > 0 else 0
    rate1 = np.mean(group1) if len(group1) > 0 else 0

    return abs(rate0 - rate1), rate0, rate1


@app.post("/analyze")
async def analyze(
    file: UploadFile = File(...),
    target: str = Form(...),
    protected: str = Form(...)
):
    try:
        # ---- Load CSV ----
        df = pd.read_csv(file.file)

        # ---- Validate columns ----
        if target not in df.columns or protected not in df.columns:
            return {"error": "Invalid column names"}

        # ---- Handle missing values ----
        df = df.dropna(subset=[target, protected])

        # ---- Encode protected column if needed ----
        if df[protected].dtype == 'object':
            unique_vals = df[protected].unique()
            if len(unique_vals) != 2:
                return {"error": "Protected column must have exactly 2 groups"}
            
            mapping = {unique_vals[0]: 0, unique_vals[1]: 1}
            df[protected] = df[protected].map(mapping)
        else:
            # Ensure only 2 groups
            if len(df[protected].unique()) != 2:
                return {"error": "Protected column must have exactly 2 groups"}

        # ---- Ensure target is numeric (0/1) ----
        if df[target].dtype == 'object':
            return {"error": "Target column must be numeric (0/1)"}

        y = df[target].values
        sensitive = df[protected].values

        # ---- Compute bias ----
        dpd, rate0, rate1 = demographic_parity_difference(y, sensitive)

        # ---- Group distribution ----
        group_counts = df[protected].value_counts().to_dict()

        # ---- Verdict ----
        verdict = "Bias detected" if dpd > 0.1 else "Low bias"

        # ---- Explanation ----
        if dpd > 0.1:
            if rate0 > rate1:
                explanation = (
                    f"Group 0 has a higher selection rate ({round(rate0,2)}) "
                    f"than Group 1 ({round(rate1,2)}), indicating potential bias."
                )
            else:
                explanation = (
                    f"Group 1 has a higher selection rate ({round(rate1,2)}) "
                    f"than Group 0 ({round(rate0,2)}), indicating potential bias."
                )
        else:
            explanation = "Selection rates are similar across groups, indicating low bias."

        # ---- Disparate Impact (bonus metric) ----
        di = (rate1 / rate0) if rate0 != 0 else 0

        return {
            "analysis_type": "Data Level Bias Only",
            "protected_column": protected,
            "target_column": target,

            "group_distribution": group_counts,

            "selection_rate": {
                "group_0": round(rate0, 3),
                "group_1": round(rate1, 3)
            },

            "demographic_parity_difference": round(dpd, 3),

            "disparate_impact": round(di, 3),

            "verdict": verdict,
            "explanation": explanation
        }

    except Exception as e:
        return {"error": str(e)}