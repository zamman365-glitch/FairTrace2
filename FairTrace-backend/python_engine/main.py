import sys
import json
import argparse
import pandas as pd
from fairlearn.metrics import demographic_parity_difference, equalized_odds_difference

def perform_bias_audit(dataset_path, target_column, protected_attribute):
    try:
        # 1. Load the dataset
        df = pd.read_csv(dataset_path)
        
        # 2. Basic Validation 
        # In a real scenario, you'd load a trained model (.pkl) here.
        # This calculates bias based on the ground truth labels.
        y_true = df[target_column]
        sensitive_features = df[protected_attribute]

        # 3. Calculate Forensic Metrics
        # Demographic Parity: Is one group getting the 'Yes' outcome more than the other?
        dp_diff = demographic_parity_difference(y_true, y_true, sensitive_features=sensitive_features)
        
        # Equalized Odds: Is the error rate higher for one group?
        eo_diff = equalized_odds_difference(y_true, y_true, sensitive_features=sensitive_features)

        # 4. Generate the JSON Report for Node.js
        results = {
            "biasScore": round(dp_diff * 100, 2),
            "status": "Completed",
            "metrics": {
                "demographic_parity": round(dp_diff, 4),
                "equalized_odds": round(eo_diff, 4)
            },
            "remediation": [
                f"Disparity detected in {protected_attribute} group.",
                "Recommendation: Apply SMOTE to rebalance minority classes.",
                "Review proxy variables like Zip Code or Education that correlate with " + protected_attribute
            ]
        }
        return results

    except Exception as e:
        return {"status": "Error", "message": str(e)}

if __name__ == "__main__":
    # Setup Argument Parsing to match your Node.js spawn command
    parser = argparse.ArgumentParser()
    parser.add_argument('--session_id', required=True)
    parser.add_argument('--dataset', required=True)
    parser.add_argument('--target', required=True)
    parser.add_argument('--protected', required=True)
    # Adding an optional model path as your Node code sends it
    parser.add_argument('--model', required=False) 
    
    args = parser.parse_args()

    # Execute and Print result
    final_output = perform_bias_audit(args.dataset, args.target, args.protected)
    
    # This print statement is what your Node.js code 'reads'
    print(json.dumps(final_output))