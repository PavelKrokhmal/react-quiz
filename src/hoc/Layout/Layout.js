import React, {Component} from 'react'
import styles from './Layout.module.css'
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle'
import Drawer from '../../components/Navigation/Drawer/Drawer'

class Layout extends Component {
  state = {
    isOpenMenu: false
  }

  toggleMenuHandler = () => {
    this.setState(
      {
        isOpenMenu: !this.state.isOpenMenu
      }
    )
  }

  menuCloseHandler = () => {
    this.setState(
      {
        isOpenMenu: false
      }
    )
  }

  render() {
    return (
      <div className={styles.Layout}>
        <Drawer isOpen={this.state.isOpenMenu} onClose={this.menuCloseHandler}/>
        <MenuToggle onToggle={this.toggleMenuHandler} isOpen={this.state.isOpenMenu}/>
        <main>
          { this.props.children }
        </main>
      </div>
    )
  }
}

export default Layout