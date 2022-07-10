const baseUrl = 'https://restcountries.com/v3.1/all'

const fetchCountries = async (url) => {
  const response = await fetch(url)
  const { ok, status } = response

  if (!ok || status !== 200) {
    throw new Error('Erro na requisição')
  } else {
    const data = await response.json()
    return data
  }
}

const getCountriesPromises = async () => {
  try {
    const countries = await fetchCountries(baseUrl)
    return countries
  } catch (error) {
    console.log(error)
  }
}

const resolveAllCountriesPromises = async () => {
  const countriesPromises = await getCountriesPromises(baseUrl)
  const countries = await Promise.all(countriesPromises)
  return countries
}

const insertCountriesIntoDOM = async () => {
  const ul = document.querySelector('ul[data-js="countries"]')
  
  const countries = await resolveAllCountriesPromises()
  countries.map(item => {
    const { capital, cca2, currencies, flags, name, region, population } = item
    let coin = ''
    let coinSymbol = ''

    if (currencies) {
      const [firstKey] = Object.keys(currencies)
      coin = currencies[firstKey].name
      coinSymbol = currencies[firstKey].symbol
    }

    const li = document.createElement('li')
    li.innerHTML = `
      <header>
        <h1>${cca2}</h1>
        <div>
          <img src="${flags.png}" />
        </div>
      </header>
      <article>
        <h2>${name.common}</h2>
        <p>Capital: ${capital}</p>
        <p>Região: ${region}</p>
        <p>População: ${population}</p>
        <p>Moeda: ${coin}</p>
        <p>Símbolo: ${coinSymbol}</p>
      </article>
    `
  
    ul.appendChild(li)
  })
}

insertCountriesIntoDOM()
