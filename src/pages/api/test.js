export default function GET(req, res) {
    return(
      res.status(200).json({
        message: "Success"
      })
    )
  }