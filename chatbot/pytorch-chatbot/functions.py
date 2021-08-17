import json
import numpy as np
import pathlib

from termcolor import colored


test = [('cual', 'PRON', 'PRON'), ('es', 'AUX', 'AUX'), ('el', 'DET', 'DET'), ('precio', 'NOUN', 'NOUN'), ('de', 'ADP', 'ADP'), ('la', 'DET', 'DET'), ('mesa', 'NOUN', 'NOUN'), ('1', 'NUM', 'NUM')]
senttest = "cual es el precio y material de la mesa 1"

with open(pathlib.Path(__file__).parent.resolve()/'./data/testProducts.json') as file:
    products = json.load(file)

# Translated product object attributes
productsKeys = ["Nombre", "Precio", "Colores", "Materiales", "m2", "Imagen"]

def findProduct(pos_list, sentence):
    botAnswer = ''
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
                    # Appending answer for each product
                    botAnswer += fixAnswer(productObjects, id, attributeList)
                    print(
                colored(f"Caracteristicas\n{productToFindType} {id}", "yellow"))
                    
                except IndexError:
                    print(colored('Este articulo no existe', 'red'))
                    botAnswer = 'Este articulo no existe'
            else:
                print(colored("No pude encontrarlo, vuelve a escribir el producto!",'cyan'))
                botAnswer = 'No pude encontrarlo, vuelve a escribir el producto!'
    return botAnswer

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
    
def fixAnswer(product, id, attributeList):
    # Creating empty answer
    botAnswer = ''
    # Adding id attribute to list in order to get correct attributes idx
    keys = np.insert(productsKeys,0,'ID')
    attrListES = []
    for i in range(len(keys)):
        # Filtering to get ONLY attributes asked
        if attributeList[i] == 1:
            attribute = keys[i]
            # Changing attributes to singular
            if attribute == 'Colores': attribute = 'Color'
            if attribute == 'Materiales': attribute = 'Material'
            attrListES.append(attribute)
    # Finding product 
    productFinded = [obj for obj in product[0]['product'] if obj['id'] == int(id)][0]  

    for attr in attrListES:
        valor = ''
        # Concatenating answer for every attribute asked for 1 product
        # Modify to wanted style answer
        # e.x: Precio mesa 4 es
        botAnswer += f"{attr} {product[0]['category']} {id} es "
        for idx, (key, value) in enumerate(productFinded.items()):
            # Finding value of asked attribute
            if attributeList[idx] == 1:
                valor = str(value) + '\n'
                # Appending value to final answer
                botAnswer += valor
                # Setting attribute to 0 in order to get next attribute
                attributeList[idx] = 0
                break
            
    return botAnswer
