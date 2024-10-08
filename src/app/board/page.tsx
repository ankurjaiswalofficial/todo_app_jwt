"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Trash2, Edit } from "lucide-react"
import { TodoType } from "@/types/todo-type"
import { GetLocalStorageService, SetLocalStorageService } from "@/service/local-storage-service"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"

function TodoPage() {
    const [todos, setTodos] = useState<TodoType[]>([])
    const [newTodo, setNewTodo] = useState("")
    const [editingTodo, setEditingTodo] = useState<TodoType | null>(null)
    const [editText, setEditText] = useState("")

    useEffect(() => {
        const storedTodos = GetLocalStorageService("todos")
        if (storedTodos) {
            setTodos(JSON.parse(storedTodos))
        }
    }, [])

    useEffect(() => {
        if (todos.length > 0) {
            SetLocalStorageService("todos", todos, false);
        }
    }, [todos])

    const addTodo = () => {
        if (newTodo.trim() !== "") {
            setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }])
            setNewTodo("");
        }
    }

    const deleteTodo = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id))
    }

    const toggleTodo = (id: number) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        )
    }

    const startEditing = (todo: TodoType) => {
        setEditingTodo(todo)
        setEditText(todo.text)
    }

    const saveEdit = () => {
        if (editingTodo && editText.trim() !== "") {
            setTodos(
                todos.map((todo) =>
                    todo.id === editingTodo.id ? { ...todo, text: editText } : todo
                )
            )
            setEditingTodo(null)
        }
    }

    return (
        <Card className="p-2 max-w-md m-auto">
            <CardHeader>
                <CardTitle>TodoList</CardTitle>
                <CardDescription>
                    Your&apos;e the owner of your data!! :)
                    <br />
                    <span className="text-sm font-semibold text-yellow-500">
                        Please don&apos;t clear your Local Storage data else you&apos;ll lose all Todo&apos;s
                    </span>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex space-x-2 mb-4">
                    <Input
                        type="text"
                        placeholder="Add a new todo"
                        value={newTodo}
                        className="h-10"
                        onChange={(e) => setNewTodo(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && addTodo()}
                    />
                    <Button size={"sm"} onClick={addTodo}>Add</Button>
                </div>
                <ScrollArea className="min-h-4 h-96">
                    {todos.map((todo) => (
                        <Card key={todo.id} className="mb-2">
                            <CardContent className="flex items-center justify-between p-2 pl-4">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        checked={todo.completed}
                                        onCheckedChange={() => toggleTodo(todo.id)}
                                    />
                                    <span
                                        className={cn({ "line-through text-neutral-500": todo.completed })}
                                    >
                                        {todo.text}
                                    </span>
                                </div>
                                <div className="flex space-x-2">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => startEditing(todo)}
                                    >
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => deleteTodo(todo.id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </ScrollArea>
            </CardContent>
            <Dialog open={editingTodo !== null} onOpenChange={() => setEditingTodo(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Todo</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                        <Label htmlFor="editTodo" className="text-right">
                            Todo Text
                        </Label>
                        <Input
                            id="editTodo"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <DialogFooter>
                        <Button onClick={saveEdit}>Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Card>
    )
}

export default TodoPage;
