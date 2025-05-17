// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function GET(req, res) {
  return (
    res.status(200).json({ 
      product: {
        name: "Tempurung Dino",
        description: "Harga boleh cincai",
        price: 100,
        image: "https://via.placeholder.com/150",
      },
      description: {
        title: "Section Title",
        description: "Section Description",
        image: "https://via.placeholder.com/150",
        link: "https://xion1.com",
      },
    })
  )}
