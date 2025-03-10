import React, { useEffect, useState } from "react";
import { Table, Button, Popconfirm, message, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { fetchBlogs, deleteBlog } from "./blogServices.js";

export default function BlogTable() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [navigateLoading, setNavigateLoading] = useState(false); // State for navigation loading
  const navigate = useNavigate();

  // Fetch blogs
  const loadBlogs = async () => {
    setLoading(true);
    try {
      const data = await fetchBlogs();
      setBlogs(data);
    } catch (error) {
      message.error("Failed to fetch blogs!");
    } finally {
      setLoading(false);
    }
  };

  // Fetch on mount
  useEffect(() => {
    loadBlogs();
  }, []);

  // Delete handler
  const handleDelete = async (id) => {
    try {
      await deleteBlog(id);
      message.success("Blog deleted successfully!");
      loadBlogs(); // Reload after deletion
    } catch (error) {
      message.error("Failed to delete blog.");
    }
  };

  // Edit handler - Navigate to form with blog data
  const handleEdit = (blog) => {
    setNavigateLoading(true); // Start loading
    setTimeout(() => {
      navigate(`/blogTable/edit/${blog.id}`, { state: { blog } });
      setNavigateLoading(false); // Stop loading after navigation
    }, 1000); // Simulate a 1-second delay
  };

  // Add handler - Navigate to add blog page
  const handleAdd = () => {
    setNavigateLoading(true); // Start loading
    setTimeout(() => {
      navigate("/blogNew");
      setNavigateLoading(false); // Stop loading after navigation
    }, 1000); // Simulate a 1-second delay
  };

  // Table columns
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, blog) => (
        <>
          <Button onClick={() => handleEdit(blog)} type="link">
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this blog?"
            onConfirm={() => handleDelete(blog.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div className="p-0">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Blogs</h2>
        <Button type="primary" onClick={handleAdd}>
          Add New Blog
        </Button>
      </div>
      <Spin spinning={navigateLoading || loading} delay={500}>
        <Table
          columns={columns}
          dataSource={blogs}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 5 }}
        />
      </Spin>
    </div>
  );
}