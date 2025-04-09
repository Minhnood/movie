import React, { useState } from "react";
import { Form, Button, Card, Container, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../store/userSlice";

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        
        if (!username || !password) {
            setError("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        const data = { username, password };
        dispatch(login(data)).then((res) => {
            if (!res.error) {
                navigate("/");
            } else {
                setError("Tên đăng nhập hoặc mật khẩu không đúng!");
            }
        });
    }

    return (
        <div className="bg-dark">
            <Container className="d-flex justify-content-center align-items-center vh-100">
                <Card className="p-4 shadow" style={{ width: "320px" }}>
                    <h3 className="text-center mb-3">Đăng Nhập</h3>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicUsername">
                            <Form.Label>Tên đăng nhập</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Nhập tên" 
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)} 
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Mật khẩu</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Nhập mật khẩu" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100">
                            Đăng Nhập
                        </Button>
                    </Form>
                </Card>
            </Container>
        </div>
    );
};

export default LoginForm;
