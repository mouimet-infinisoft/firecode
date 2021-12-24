
  import ButtonTestPrimary from './generated/ButtonTestPrimary.jsx'
  import classes from './classes.module.scss'

  const ButtonTestPrimaryRoot = ({children, ...props}) => {
  
  
  
      return <ButtonTestPrimary styles={classes} {...props}>children</ButtonTestPrimary>
  }
  
  export default ButtonTestPrimaryRoot