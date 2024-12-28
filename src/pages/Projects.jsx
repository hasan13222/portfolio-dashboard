import { Button, Form, Input, Modal } from "antd";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import {
  useCreateProjectsMutation,
  useDeleteProjectsMutation,
  useGetProjectsQuery,
  useUpdateProjectsMutation,
} from "../redux/api/projectsApi";
import { useState } from "react";

const Projects = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState("");

  const [form] = Form.useForm();

  const { data: projects } = useGetProjectsQuery();
  const [addProjects] = useCreateProjectsMutation();
  const [updateProjects] = useUpdateProjectsMutation();
  const [deleteProjects] = useDeleteProjectsMutation();

  async function onFinish(values) {
    if (editMode) {
      const updatedProjects = await updateProjects({
        id: editId,
        body: values,
      });
      if (updatedProjects) {
        setIsModalOpen(false);
        alert("Projects updated successfully");
      }
    } else {
      const addedProjects = await addProjects(values);
      if (addedProjects.data) {
        setIsModalOpen(false);
        alert("Projects Added successfully");
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
    });
    setIsModalOpen(true);
  };
  return (
    <div>
      <Button
        onClick={() => {
          setEditMode(false);
          form.setFieldsValue({
            picture: "",
            description: "",
            live_link: "",
            code_link: "",
          });
          showModal(true);
        }}
        style={{ marginBottom: 15 }}
        type="primary"
      >
        + Add Projects
      </Button>

      <Modal
        title={editMode ? "Update Projects" : "Add Projects"}
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
          <Form.Item name="picture" label="Picture">
            <Input placeholder="Picture" />
          </Form.Item>
          <Form.Item name="live_link" label="Live Link">
            <Input placeholder="Live Link" />
          </Form.Item>
          <Form.Item name="code_link" label="Code Link">
            <Input placeholder="Code Link" />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input placeholder="Description" />
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" type="primary">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <div className="items">
        {projects?.data?.map((item) => (
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
              <img style={{width: '100%',objectFit: 'contain'}} src={item.picture} alt="" />
              <Button onClick={() => updateHandler(item._id, item)}>
                <EditFilled />
              </Button>
              <Button
                style={{ color: "red" }}
                onClick={() => deleteProjects(item._id)}
              >
                <DeleteFilled />
              </Button>
            </h2>
            <p style={{ marginBottom: 8 }}>{item.description}</p>
            <p>Live Link: {item.live_link}</p>
            <p>Code Link: {item.code_link}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
