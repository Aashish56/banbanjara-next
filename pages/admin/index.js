import { useEffect } from "react";
import Main from "../../components/Main/Main";

const Index = (props) => {
  useEffect(() => {
    props.setTitle("Home!!!");
  }, []);
  return (
    <div>
      <Main />
    </div>
  );
};

export default Index;
