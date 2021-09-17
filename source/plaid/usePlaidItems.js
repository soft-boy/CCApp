import React from "react"
import { FirebaseContext } from "../auth/FirebaseProvider"

export default () => {
  const [plaidItems, setPlaidItems] = React.useState([])
  const { getPlaidItems } = React.useContext(FirebaseContext)

  React.useEffect(() => {
    const fetchPlaidItems = async () => {
      const items = await getPlaidItems()
      setPlaidItems(items)
    }

    fetchPlaidItems()
  }, [])

  return plaidItems
}