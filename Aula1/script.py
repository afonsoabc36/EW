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
os.mkdir("html")

content = json.loads(file)

html += "<ul>\n"

listaCidades = []

for elem in content["cidades"]:
    listaCidades.append(elem["nome"])

    templateCidade = template
    templateCidade += f"<h1>{elem['nome']}</h1>\n"
    templateCidade += f"<h3>{elem['distrito']}</h3>\n"
    templateCidade += f"<p><b>População: </b>{elem['população']}</p>\n"
    templateCidade += f"<p><b>Descrição: </b>{elem['descrição']}</p>\n"
    templateCidade += f"<h5> <a href='../mapa_sorted.html'>Voltar</a> <h5>\n"
    templateCidade += "</body>\n"
    templateCidade += f"</html>\n"

    fileCidade = open(f"html/{elem['nome']}.html", "w", encoding="utf-8")
    fileCidade.write(templateCidade)
    fileCidade.close()



for elem in sorted(listaCidades):
    html += f"<li><a href='html/{elem}.html'>{elem}</a></li>\n"

html += "</ul>\n"

html += "</body>\n"
html += "</html>"

file = open("mapa_sorted.html", "w", encoding="utf-8")
file.write(html)
file.close()