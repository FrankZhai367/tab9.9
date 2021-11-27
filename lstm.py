# Importing the Libraries

from tensorflow.keras.models import load_model
import numpy as np
import pickle
import re

# Load the model and tokenizer

model = load_model('next_word/nxtmodel.h5')
tokenizer = pickle.load(open('next_word/tokenizer1.pkl', 'rb'))

def Predict_Next_Words(model, tokenizer, text):
    """
        In this function we are using the tokenizer and models trained
        and we are creating the sequence of the text entered and then
        using our model to predict and return the the predicted word.
    """
    sequence = tokenizer.texts_to_sequences([text])[0]
    sequence = np.array(sequence)
    # preds = model.predict_classes(sequence)
    predict_x = model.predict(sequence)
    preds = np.argmax(predict_x, axis=1)
    predicted_word = ""
    
    for key, value in tokenizer.word_index.items():
        if value == preds:
            predicted_word = key
            break
    
    return predicted_word

def predict(text):
    try:
        txtArr = text.strip().split(" ")
        text = ''
        while len(txtArr) > 0:
            txt = txtArr.pop()
            x = re.search("^[A-z\.\!\:\<\>\{\}\[]{2,}$", txt)
            if x:
                text = x.string
                break
        return Predict_Next_Words(model, tokenizer, text)
    except:
        return 'React.'