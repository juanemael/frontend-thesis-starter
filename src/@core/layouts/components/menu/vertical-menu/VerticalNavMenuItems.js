// ** Vertical Menu Components
import VerticalNavMenuLink from './VerticalNavMenuLink'
import VerticalNavMenuGroup from './VerticalNavMenuGroup'
import VerticalNavMenuSectionHeader from './VerticalNavMenuSectionHeader'

// ** Utils
import {
  canViewMenuGroup,
  canViewMenuItem,
  resolveVerticalNavMenuItemComponent as resolveNavItemComponent
} from '@layouts/utils'
import {useState} from "react";

const VerticalMenuNavItems = props => {
  // ** Components Object
  const Components = {
    VerticalNavMenuLink,
    VerticalNavMenuGroup,
    VerticalNavMenuSectionHeader
  }
  const [isSJPH, setIsSJPH] = useState(false)

  // ** Render Nav Menu Items
  return props.items.map((item, index) => {
    const TagName = Components[resolveNavItemComponent(item)]
    if (item.children) {
      return <TagName item={item} index={index} key={item.id} {...props} />
      // return canViewMenuGroup(item) || <TagName item={item} index={index} key={item.id} {...props} />
    }
    // return canViewMenuItem(item) || <TagName key={item.id || item.header} item={item} {...props} />
    return <TagName key={item.id || item.header} item={item} {...props} />
  })
}

export default VerticalMenuNavItems
