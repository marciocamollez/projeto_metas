1-Criar o package
# npm init

2-Criar o projeto React e o next
# npm install next react react-dom

3-Incluir os scripts no package.json

"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start"
}

4-Para rodar o projeto
# npm run dev

OBS: Por padrão, o react roda na porta localhost:3000

5-Importar o Bootstrap primeiro e o Reactstrap depois. O Reactstrap não tem o CSS do bootstrap, por isso é necessário ter os dois.
# npm install --save bootstrap
# npm install --save reactstrap react react-dom