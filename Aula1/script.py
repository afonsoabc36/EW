import shutil
import json
import os

html = """
<!DOCTYPE html>
<html>
<head>
    <title>EngWeb2024</title>
    <meta charset="UTF-8"/>
</head>
<body>
"""

template = html

file = open("mapa.json", "r", encoding="utf-8").read()
if os.path.exists("html"):
    shutil.rmtree("html")
os.mkdir("html")

content = json.loads(file)

html += "\t<ul>\n"

listaCidades = []

for elem in content["cidades"]:
    listaCidades.append(elem["nome"])

    templateCidade = template
    templateCidade += f"\t<h1>{elem['nome']}</h1>\n"
    templateCidade += f"\t<h3>{elem['distrito']}</h3>\n"
    templateCidade += f"\t<p><b>População: </b>{elem['população']}</p>\n"
    templateCidade += f"\t<p><b>Descrição: </b>{elem['descrição']}</p>\n"
    templateCidade += f"\t<h5><a href='../mapa_sorted.html'>Voltar</a><h5>\n"
    templateCidade += "</body>\n"
    templateCidade += "</html>\n"

    fileCidade = open(f"html/{elem['nome']}.html", "w", encoding="utf-8")
    fileCidade.write(templateCidade)
    fileCidade.close()



for elem in sorted(listaCidades):
    html += f"\t\t<li><a href='html/{elem}.html'>{elem}</a></li>\n"

html += "\t</ul>\n"

html += "</body>\n"
html += "</html>"

file = open("mapa_sorted.html", "w", encoding="utf-8")
file.write(html)
file.close()