const proxyurl = "https://cors-anywhere.herokuapp.com/";
//const url = "http://www.cvedetails.com/json-feed.php?numrows=30&vendor_id=0&product_id=0&version_id=0&hasexp=0&opec=0&opov=0&opcsrf=0&opfileinc=0&opgpriv=0&opsqli=0&opxss=0&opdirt=0&opmemc=0&ophttprs=0&opbyp=0&opginf=0&opdos=0&orderby=2&cvssscoremin=0"; 
const url = "cve.circl.lu/api/last";

const app = document.getElementById('root')


const container = document.createElement('div')
container.setAttribute('class', 'loader')

app.appendChild(container)

var request = new XMLHttpRequest()
fetch(request.open('GET', proxyurl+url, true))
.then(request.onload = function() {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response)
  container.setAttribute('class', 'container')

  if (request.status >= 200 && request.status < 400) {

    data.forEach(vul =>{
       
	  
      const card = document.createElement('div')
	  if(parseInt(vul.cvss) <4){
      card.setAttribute('class', 'cardverde')
      }else if(parseInt(vul.cvss) >= 4 && parseInt(vul.cvss) < 6){
	  card.setAttribute('class', 'cardamarelo')  
	   }else if(parseInt(vul.cvss) >= 6 && parseInt(vul.cvss) < 9){
	  card.setAttribute('class', 'cardlaranja') 
	   }else if(parseInt(vul.cvss) >= 9 && parseInt(vul.cvss) <= 10){
	  card.setAttribute('class', 'cardred') 
	  }else{
      card.setAttribute('class', 'cardblue')  
	  } 
   
      
      const cardcontent = document.createElement('div')
      cardcontent.setAttribute('class', 'cardcontent')

      const title = document.createElement('h3')
      title.textContent = vul.id

      const description = document.createElement('p')
      // vul.summary = vul.summary
      // p.textContent = `${vul.summary}...`
      description.textContent = vul.summary

      const update = document.createElement('p')

      const cvsScore = document.createElement('p')
      cvsScore.textContent = vul.cvss

    
   
      repair = JSON.stringify(vul.Modified)

        ano = repair.substring(1,5)
        mes = repair.substring(6,8)
        dia = repair.substring(9,11)
        time = repair.substring(12,20)

      update.textContent = "Ultima atualização: " + dia + "/" + mes + "/" + ano + ". Horário: " + time
    
      container.appendChild(card)
      card.appendChild(cardcontent)
      cardcontent.appendChild(title)
      cardcontent.appendChild(update)
      cardcontent.appendChild(description)
      


    })
  } else {
    const errorMessage = document.createElement('marquee')
    errorMessage.textContent = `Erro!`
    app.appendChild(errorMessage)
  }
})

request.send()