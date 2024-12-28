import { Button, Form, Input, Modal } from "antd";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import {
  useCreateExperienceMutation,
  useDeleteExperienceMutation,
  useGetExperienceQuery,
  useUpdateExperienceMutation,
} from "../redux/api/experienceApi";
import { useState } from "react";
import moment from "moment";

const Experience = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState("");

  const [form] = Form.useForm();

  const { data: experiences } = useGetExperienceQuery();
  const [addExperience] = useCreateExperienceMutation();
  const [updateExperience] = useUpdateExperienceMutation();
  const [deleteExperience] = useDeleteExperienceMutation();

  async function onFinish(values) {
    if (editMode) {
      const updatedExperience = await updateExperience({
        id: editId,
        body: values,
      });
      if (updatedExperience) {
          setIsModalOpen(false);
        alert("Experience updated successfully");
      }
    } else {
      const addedExperience = await addExperience(values);
      if (addedExperience.data) {
          setIsModalOpen(false);
        alert("Experience Added successfully");
      }
    }
  }
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const updateHandler = (id, item) => {
    setEditMode(true);
    setEditId(id);
    form.setFieldsValue({...item, start_date: moment(item.start_date).format('YYYY-MM-DD'), end_date: moment(item.end_date).format('YYYY-MM-DD')});
    setIsModalOpen(true);
  };
  return (
    <div>
      <Button
        onClick={() => {
          setEditMode(false);
            form.setFieldsValue({company: '', designation: '', start_date: '', end_date: ''})
            showModal(true)}}
        style={{ marginBottom: 15 }}
        type="primary"
      >
        + Add Experience
      </Button>

      <Modal
        title={editMode ? "Update Experience" : "Add Experience"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          initialValues={{}}
          onFinish={onFinish}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 10,
          }}
          layout="vertical"
        >
          <Form.Item name="company" label="Company">
            <Input placeholder="Company" />
          </Form.Item>
          <Form.Item name="designation" label="Designation">
            <Input placeholder="Designation" />
          </Form.Item>
          <Form.Item name="start_date" label="Start date">
            <Input type="date" placeholder="Start date" />
          </Form.Item>
          <Form.Item name="end_date" label="End date">
            <Input type="date" placeholder="End date" />
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" type="primary">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <div className="items">
        {experiences?.data?.map((item) => (
          <div
            style={{
              marginBottom: 15,
              border: "1px solid gainsboro",
              borderRadius: "5px",
              padding: "10px",
            }}
            key={item._id}
          >
            <h2>
              {item.company}{" "}
              <Button onClick={() => updateHandler(item._id, item)}>
                <EditFilled />
              </Button>
              <Button style={{color:'red'}} onClick={() => deleteExperience(item._id)}>
                <DeleteFilled />
              </Button>
            </h2>
            <h5 style={{ marginBottom: 8 }}>{item.designation}</h5>
            <p>
              {item.start_date} - {item.end_date}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
