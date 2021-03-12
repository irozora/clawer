# Clawer
A web scraping CLI built via Node.js, used to parse certain information from [Alexa](www.alexa.com) and only.

## Setup
To run this project, download the code and install it locally using npm:

```
git clone https://github.com/irozora/clawer.git
cd ../clawer
npm install
npm link
```

## Usage
#### To show certain top number of websites Url 
```
clawer top <number>
clawer -t <number>
```
- The requested number should between 1 to 50. 

#### To show top 20 websites Url by certain country 
```
clawer country <country>
clawer -c <country>
```

## Technologies
* Node.js
* axios
* cheerio
* commander

## Disclaimer
This project(clawer) is a web scraping app used for practicing purpose only. The extracted information are only be shown via terminal and is not stored to any files or database.

## Author
Sophie Lin [@github.com/irozora](https://github.com/irozora "github.com/irozora")
