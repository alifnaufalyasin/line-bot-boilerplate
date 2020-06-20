const axios = require('axios');
const setFlexOrg = require('../flex/flexOrganisasi')

async function login(arrText, Context, userId) {
  let data = {}
  data.email = arrText[1]
  data.password = arrText[2]
  axios({
    url: "https://5ab20e50db87.ngrok.io/api/admin/login",
    method: "POST",
    data: data,
  })
  .then(async (response) => {
    if(response.success){
      let token = {}
      token.userId = userId
      token.token = response.data.token
      axios({
        url: "https://5ab20e50db87.ngrok.io/api/lineBot/set",
        method: "POST",
        data: token,
      })
      const flexOrganisasi = await setFlexOrg(response.data.organisasi)
      Context.reply([
        {
          type: "text",
          text: "Login berhasil"
        },
        {
          type: "flex",
          altText: "Carousel Organisasi",
          contents: flexOrganisasi
        }
      ])
    }else{
      Context.reply([
        {
          type: "text",
          text: response.message
        }
      ])
    }
  })
  .catch((err) => {
    Context.reply([
      {
        type: "text",
        text: JSON.toString(err)
      }
    ])
  })
}

module.exports = login