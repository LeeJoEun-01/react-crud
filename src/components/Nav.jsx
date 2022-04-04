export default function Nav(props) {
  const lis = [];
  for(let i=0; i<props.topics.length; i++){
    let t = props.topics[i];
    lis.push(<li key={ t.id }>
      {/* id가 숫자였지만, 태그의 속성으로 넘기면 문자열로 바뀐다. */}
      <a id={ t.id } href={ "/read"+t.id } onClick={(event)=>{
        event.preventDefault();
        props.onChangeMode(Number(event.target.id)); // Number 문자를 숫자로 converting
      // event.target은 이벤트를 유발시킨 태그를 가르킨다. 여기서는 <a></a>
      }}>{ t.title }</a></li>)
  }
  return (
    <nav>
      <ol>
        { lis }
      </ol>
    </nav>
  );
}