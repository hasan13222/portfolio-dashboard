import { Button, Form, Input, Modal } from "antd";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import {
  useCreateEducationMutation,
  useDeleteEducationMutation,
  useGetEducationQuery,
  useUpdateEducationMutation,
} from "../redux/api/educationApi";
import { useState } from "react";
import moment from "moment";

const Education = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState("");

  const [form] = Form.useForm();

  const { data: educations } = useGetEducationQuery();
  const [addEducation] = useCreateEducationMutation();
  const [updateEducation] = useUpdateEducationMutation();
  const [deleteEducation] = useDeleteEducationMutation();

  async function onFinish(values) {
    if (editMode) {
      const updatedEducation = await updateEducation({
        id: editId,
        body: values,
      });
      if (updatedEducation) {
          setIsModalOpen(false);
        alert("Education updated successfully");
      }
    } else {
      const addedEducation = await addEducation(values);
      if (addedEducation.data) {
          setIsModalOpen(false);
        alert("Education Added successfully");
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
            form.setFieldsValue({institution: '', course: '', start_date: '', end_date: ''})
            showModal(true)}}
        style={{ marginBottom: 15 }}
        type="primary"
      >
        + Add Eduction
      </Button>

      <Modal
        title={editMode ? "Update Education" : "Add Education"}
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
          <Form.Item name="institution" label="Institution">
            <Input placeholder="Institution" />
          </Form.Item>
          <Form.Item name="course" label="Course">
            <Input placeholder="Course" />
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
        {educations?.data?.map((item) => (
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
              {item.institution}{" "}
              <Button onClick={() => updateHandler(item._id, item)}>
                <EditFilled />
              </Button>
              <Button style={{color:'red'}} onClick={() => deleteEducation(item._id)}>
                <DeleteFilled />
              </Button>
            </h2>
            <h5 style={{ marginBottom: 8 }}>{item.course}</h5>
            <p>
              {item.start_date} - {item.end_date}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Education;
