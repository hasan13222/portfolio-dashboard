import { Button, Form, Input } from "antd";
import {
  useCreateSummaryMutation,
  useGetSummaryQuery,
} from "../redux/api/dashboardApi";
import { useEffect } from "react";

const Dashboard = () => {
  const { data } = useGetSummaryQuery();

  const [addSumary] = useCreateSummaryMutation(undefined);

  const [form] = Form.useForm();
  const onFinish = async (values) => {
    const updateSummary = await addSumary(values);
    if (updateSummary?.data) {
      alert("Summary updated successfully");
    }
  };

  useEffect(() => {
    form.setFieldsValue(data?.data);
  }, [data, form]);
  return (
    <div>
      <h2 style={{ marginBottom: 20 }}>Dashboard</h2>
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
        <Form.Item name="title" label="Title">
          <Input placeholder="Title" />
        </Form.Item>
        <Form.Item name="subtitle" label="Subtitle">
          <Input placeholder="Subtitle" />
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
export default Dashboard;
