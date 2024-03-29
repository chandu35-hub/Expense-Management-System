import React, { useState, useEffect } from "react";
import { Form, Input, Modal, Select, message } from "antd";
import Layout from "../components/layouts/Layout";
import axios from "axios";
import Spinner from "../components/Spinner";

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false)
  const [allTransaction, setAllTransaction] = useState ([])

  // getall transactions
  const getAllTransactions = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'))
      setLoading(true)
      const res = await axios.post ('/transactions/get-transaction', {userid: user._id})
      setLoading (false)
      setAllTransaction(res.data)
      console.log (res.data)
    } catch (error) {
      console.log (error)
      message.error ('Fetch Issue with Transaction')
    }
  }

  // useEffect Hook 
  useEffect(() => {
    getAllTransactions()
  }, [])

  // form handling
  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse (localStorage.getItem('user'))
      setLoading(true)
      await axios.post ('/transactions/add-transaction', {...values, userid: user._id})
      setLoading (false)
      message.success ('Transaction Added Successfully')
      setShowModal (false)
    } catch (error) {
      setLoading (false)
      message.error ('Failed to add Transaction')
    }
  }

  return (
    <Layout>
      {loading && <Spinner />}
      <div className="filters">
        <div>range filters</div>
        <div>
          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            Add New
          </button>
        </div>
      </div>
      <div className="content"></div>
      <Modal
        title="Add Transaction"
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer = {false}
      >
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label='Amount' name='amount'>
            <Input type="text" />
          </Form.Item>
          <Form.Item label='Type' name='type'>
            <Select>
              <Select.Option value='income'>Income</Select.Option>
              <Select.Option value='expense'>Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label='Category' name='category'>
            <Select>
              <Select.Option value='salary'>Salary</Select.Option>
              <Select.Option value='tip'>Tip</Select.Option>
              <Select.Option value='project'>Project</Select.Option>
              <Select.Option value='food'>Food</Select.Option>
              <Select.Option value='movie'>Movie</Select.Option>
              <Select.Option value='bills'>Bills</Select.Option>
              <Select.Option value='medical'>Medical</Select.Option>
              <Select.Option value='fee'>Fee</Select.Option>
              <Select.Option value='tax'>Tax</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label='Date' name='date'>
            <Input type="date" />
          </Form.Item>
          <Form.Item label='Reference' name='reference'>
            <Input type="reference" />
          </Form.Item>
          <Form.Item label='Description' name='description'>
            <Input type="description" />
          </Form.Item>
          <div className="d-flex justify-content-end" >
            <button type='submit' className="btn btn-primary">Save</button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};

export default HomePage;
