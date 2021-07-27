import json
import numpy as np

from termcolor import colored


test = [('cual', 'PRON', 'PRON'), ('es', 'AUX', 'AUX'), ('el', 'DET', 'DET'), ('precio', 'NOUN', 'NOUN'), ('de', 'ADP', 'ADP'), ('la', 'DET', 'DET'), ('mesa', 'NOUN', 'NOUN'), ('1', 'NUM', 'NUM')]
senttest = "cual es el precio y material de la mesa 1"


with open('./data/testProducts.json') as file:
    products = json.load(file)

# Translated product object attributes
productsKeys = ["Nombre", "Precio", "Colores", "Materiales", "m2", "Imagen"]

def findProduct(pos_list, sentence):
    # Printing general features
    print(colored("Caracteristicas generales:",'red'))
    caracteristics = ""
    for keys in productsKeys:
        caracteristics = caracteristics +keys+", "
    print(colored(caracteristics, 'red'))

    # Cycling in user's input text 
    # to find product as NOUN and its id as NUM
    for i in range(len(pos_list)):
        if pos_list[i][1] == 'NUM' and pos_list[i-1][1] == 'NOUN':
            productToFindType = pos_list[i-1][0]
            id = pos_list[i][0]
            # If product is founded in user's input
            # filter JSON to find its category (product as NOUN)
            productObjects = [p for p in products if p["category"] == productToFindType]
            # Find the attributes the user wants
            attributeList = findAttributeList(sentence)
            if len(productObjects) > 0:
                try:
                    productFinded = [obj for obj in productObjects[0]['product'] if obj['id'] == int(id)][0]
                    print(
                colored(f"Caracteristicas\n{productToFindType} {id}", "yellow"))
                    for idx, (key, value) in enumerate(productFinded.items()):
                        if attributeList[idx] == 1:
                            print(colored(f"{key} --> {value}", "green"))
                except IndexError:
                    print(colored('Este articulo no existe', 'red'))
            else:
                print(colored("No pude encontrarlo, vuelve a escribir el prodcuto!",'cyan'))


def findAttributeList(sentence):
    # Creating each word element in list
    sentence = sentence.split(" ")
    # Possible more search words for each feature
    values = [
        ["modelo", "llama"], # Nombre
        ["cuesta", "vale", "cuestan", "valor"], # Precio
        ["color"], # Colores
        ["material"], # Materiales
        ["metros", "metros cuadrados", "mide"], # m2
        [] # Imagen
        ]
    productKeys = [key.lower() for key in productsKeys]
    

    # Appending words
    for i in range(len(productKeys)):
        values[i].append(productKeys[i])

    # Creating zeros array
    correctAttr = np.zeros(len(productKeys))

    dictAttr = dict(zip(productKeys, values))
    for index, value in enumerate(dictAttr.values()):
        for i in range(len(value)):
            for word in sentence:
                if word == value[i]:
                    # Getting the attributes the user wants from product
                    correctAttr[index] =  1
    # Adding id attribute
    correctAttr = np.insert(correctAttr, 0, 0)

    return correctAttr
    
