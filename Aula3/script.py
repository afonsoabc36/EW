import csv
import json

filename = 'Health_AnimalBites.csv'

def readCsvFile(filename):
    db = []
    try:
        with open(filename, 'r') as csvfile:
            reader = csv.DictReader(csvfile, delimiter=';')
            for row in reader:
                db.append(row)
    except FileNotFoundError:
        print(f"Ficheiro {filename} não encontrado")
    except Exception as e:
        print(f"Ocorreu um error: {e}")
    
    return db

def pertence(breed, especies):
    found = False
    
    i = 0
    while i < len(especies) and not found:
        if especies[i]["designacao"] == breed:
            found = True
        i += 1

    return found


def calcEspecies(db):
    especies = []
    contador = 1
    for reg in db:
        breed = reg["BreedIDDesc"]
        if not pertence(breed, especies) and breed != "" :
            especies.append({
                "id" : f"e{contador}",
                "designacao" : breed
            })
            contador += 1
    
    return especies

def calcAnimais(db):
    animais = []
    contador = 1
    for reg in db:
        species = reg["SpeciesIDDesc"]
        if not pertence(species, animais) and species != "" :
            animais.append({
                "id" : f"a{contador}",
                "designacao" : species
            })
            contador += 1
    
    return animais

myDB = readCsvFile(filename)
especies = calcEspecies(myDB)
animais = calcAnimais(myDB)

newDB = {
    "ocorrencias" : myDB,
    "especies" : especies,
    "animais" : animais
}

with open("mordidas.json", 'w') as jsonfile:
    json.dump(newDB, jsonfile, indent= 2)