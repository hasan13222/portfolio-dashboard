import { Button, Form, Input } from "antd";
import { useEffect } from "react";
import { useCreateAboutMutation, useGetAboutQuery } from "../redux/api/aboutApi";
import moment from "moment";


const About = () => {
  const { data } = useGetAboutQuery();

  const [addSumary] = useCreateAboutMutation(undefined);

  const [form] = Form.useForm();
  const onFinish = async (values) => {
    console.log(values.birthDate)
    const updateAbout = await addSumary(values);
    if (updateAbout?.data){
        alert("Personal Details updated successfully")
    }
  };

  useEffect(() => {
    form.setFieldsValue({...data?.data, birthDate: moment(data?.data.birthDate).format('YYYY-MM-DD')})
  }, [data,form])
  return (
    <div>
      <h2 style={{ marginBottom: 20 }}>Personal Details</h2>
      <Form
      form={form}
        initialValues={data?.data}
        onFinish={onFinish}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 20,
        }}
        layout="vertical"
      >
        <Form.Item name="name" label="Name">
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item name="title" label="Title">
          <Input placeholder="Title" />
        </Form.Item>
        <Form.Item name="address" label="Address">
          <Input placeholder="Address" />
        </Form.Item>
        <Form.Item name="email" label="Email">
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item name="phone" label="Phone">
          <Input placeholder="Phone" />
        </Form.Item>
        <Form.Item name="nationality" label="Nationality">
          <Input placeholder="Nationality" />
        </Form.Item>
        <Form.Item name="study" label="Study">
          <Input placeholder="Study" />
        </Form.Item>
        <Form.Item name="degree" label="Degree">
          <Input placeholder="Degree" />
        </Form.Item>
        <Form.Item name="interest" label="Interest">
          <Input placeholder="Interest" />
        </Form.Item>
        <Form.Item name="freelance" label="Freelance">
          <Input placeholder="Freelance" />
        </Form.Item>
        <Form.Item name="birthDate" label="Birth Date">
          <Input type="date" placeholder="Birth Date" />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input placeholder="Description" />
        </Form.Item>
        <Form.Item name="picture" label="Picture">
          <Input placeholder="Picture" />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" type="primary">
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default About;
