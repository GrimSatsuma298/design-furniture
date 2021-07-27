import nltk
import numpy as np
from nltk.stem.snowball import SpanishStemmer
stemmer = SpanishStemmer()


def tokenize(sentence):
    return nltk.word_tokenize(sentence)

def stem(word):
    return stemmer.stem(word.lower())

def bag_of_words(tokenized_sentence, all_words):
    tokenized_sentence = [stem(w) for w in tokenized_sentence]
    bag = np.zeros(len(all_words), dtype=np.float32)
    for idx, word in enumerate(all_words):
        if stem(word) in tokenized_sentence:
            
            bag[idx] = 1.0
    return bag

# Example
# words = ["orgnizo", "organizando", "organizar"]
# stemmed_words = [stem(w) for w in words]
# print(stemmed_words)
# Example
# sentence = ["hola", "como", "estas"]
# words = ["hey", "hola", "yo", "adios", "estas","gracias"]
# print(bag_of_words(sentence, words))