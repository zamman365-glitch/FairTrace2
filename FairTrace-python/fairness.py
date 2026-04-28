import numpy as np

def demographic_parity_difference(y_true, y_pred, sensitive):
    group0 = y_pred[sensitive == 0]
    group1 = y_pred[sensitive == 1]

    rate0 = np.mean(group0)
    rate1 = np.mean(group1)

    return abs(rate0 - rate1)


def false_positive_rate(y_true, y_pred, sensitive):
    group0 = (sensitive == 0)
    group1 = (sensitive == 1)

    def fpr(mask):
        fp = np.sum((y_pred == 1) & (y_true == 0) & mask)
        tn = np.sum((y_pred == 0) & (y_true == 0) & mask)
        return fp / (fp + tn + 1e-6)

    return abs(fpr(group0) - fpr(group1))