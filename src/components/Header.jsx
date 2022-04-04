export default function Header(props) {
  return (
    <header>
      <h1><a href="/" onClick={(event)=>{
        event.preventDefault();  // reload 막기
        props.onChangeMode();
      }}>{ props.title }</a></h1>
    </header>
  );
}