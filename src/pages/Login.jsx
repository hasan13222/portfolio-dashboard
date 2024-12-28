import { Button, Form, Input } from "antd";
import { useLoginMutation } from "../redux/api/loginApi";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [login] = useLoginMutation();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const loggedIn = await login(values);
    localStorage.setItem('prd-token', loggedIn.data.token)
    if (loggedIn.data) {
      navigate("/");
    }
  };

  return (
    <div
      style={{
        width: "350px",
        display: "flex",
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <h2 style={{ marginBottom: 20 }}>Login</h2>
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item name="email" label="Email">
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item name="password" label="Password">
          <Input type="password" placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" type="primary">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Login;
