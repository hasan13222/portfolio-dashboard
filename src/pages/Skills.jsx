import { Button, Form, Input, Modal } from "antd";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import {
  useCreateSkillsMutation,
  useDeleteSkillsMutation,
  useGetSkillsQuery,
  useUpdateSkillsMutation,
} from "../redux/api/skillsApi";
import { useState } from "react";
import moment from "moment";

const Skills = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState("");

  const [form] = Form.useForm();

  const { data: skills } = useGetSkillsQuery();
  const [addSkills] = useCreateSkillsMutation();
  const [updateSkills] = useUpdateSkillsMutation();
  const [deleteSkills] = useDeleteSkillsMutation();

  async function onFinish(values) {
    if (editMode) {
      const updatedSkills = await updateSkills({
        id: editId,
        body: values,
      });
      if (updatedSkills) {
        setIsModalOpen(false);
        alert("Skills updated successfully");
      }
    } else {
      const addedSkills = await addSkills(values);
      if (addedSkills.data) {
        setIsModalOpen(false);
        alert("Skills Added successfully");
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
    form.setFieldsValue({
      ...item,
      start_date: moment(item.start_date).format("YYYY-MM-DD"),
      end_date: moment(item.end_date).format("YYYY-MM-DD"),
    });
    setIsModalOpen(true);
  };
  return (
    <div>
      <Button
        onClick={() => {
          setEditMode(false);
          form.setFieldsValue({
            title: "",
            description: "",
            type: "",
          });
          showModal(true);
        }}
        style={{ marginBottom: 15 }}
        type="primary"
      >
        + Add Skills
      </Button>

      <Modal
        title={editMode ? "Update Skills" : "Add Skills"}
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
          <Form.Item name="title" label="Title">
            <Input placeholder="Title" />
          </Form.Item>
          <Form.Item name="type" label="Type">
            <Input placeholder="Type" />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input placeholder="Description" />
          </Form.Item>
          <Form.Item></Form.Item>

          <Form.Item>
            <Button htmlType="submit" type="primary">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <div className="items">
        {skills?.data?.map((item) => (
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
              {item.title}
              <Button onClick={() => updateHandler(item._id, item)}>
                <EditFilled />
              </Button>
              <Button
                style={{ color: "red" }}
                onClick={() => deleteSkills(item._id)}
              >
                <DeleteFilled />
              </Button>
            </h2>
            <p style={{ marginBottom: 8 }}>{item.description}</p>
            <p>Type: {item.type}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
