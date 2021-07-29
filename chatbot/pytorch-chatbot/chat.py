import random
import json
from nltk.util import pr
import spacy

from termcolor import colored
from functions import findProduct
from colorama import Fore
import torch
from model import NeuralNet
from nltk_utils import *

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

with open('./data/intents.json', 'r') as file:
    intents = json.load(file)

FILE = "./data/data.pth"
data = torch.load(FILE)
POS_tagger = spacy.load("es_core_news_md")

input_size = data["input_size"]
hidden_size = data["hidden_size"]
output_size = data["output_size"]
all_words = data["all_words"]
tags = data["tags"]
model_state = data["model_state"]

model = NeuralNet(input_size, hidden_size, output_size).to(device)
model.load_state_dict(model_state)
model.eval()

bot_name = "Exo System"

print("\n\t\tHablemos! (escribe 'salir' para terminar)")
while True:
    # sentence = "do you use credit cards?"
    sentence = input("Yo: ")
    if sentence == "salir":
        break

    POS_list = []
    # NLTK Tagging spanish words
    tagged_words = POS_tagger(sentence)
    for token in tagged_words:
        POS_list.append((token.text, token.pos_, token.tag_))
    # print(POS_list)

    # print("********** ENTITIES *****************")

    # for ent in tagged_words.ents:
    #     print(ent.text, ent.start_char, ent.end_char, ent.label_)

    sentenceTokenized = tokenize(sentence)
    X = bag_of_words(sentenceTokenized, all_words)
    X = X.reshape(1, X.shape[0])
    X = torch.from_numpy(X).to(device)

    output = model(X)
    _, predicted = torch.max(output, dim=1)

    tag = tags[predicted.item()]

    probs = torch.softmax(output, dim=1)
    prob = probs[0][predicted.item()]
    if prob.item() > 0.75:
        for intent in intents['intents']:
            if tag == intent["tag"] and tag != "cotizar":
                print(colored(f"{bot_name}: {random.choice(intent['responses'])}", "cyan"))
            elif tag == "cotizar" and tag == intent["tag"]:
                print(colored(f"{bot_name}:",'cyan'))
                print(colored("************************BUSCANDO PRODUCTO************************", 'magenta'))
                findProduct(POS_list, sentence)
                
    else:
        print(colored(f"{bot_name}: No entiendo .... :(", "red"))
