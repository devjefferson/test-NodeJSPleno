// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  
  fetch('http://images.contelege.com.br/poi.json').then((data)=>{
     res.status(200).json(data.body)
  })
}
