import { MdDelete } from "react-icons/md";
import { useState } from "react";
import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Badge,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

export default function Todos(): JSX.Element {
  interface TodoType {
    id: number;
    title: string;
    completed: boolean;
  }
  
  // Generic type set to TodoType[]
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [title, setTitle] = useState("");
  
  const handleAdd = () => {
    if(title.length == 0){
      alert("Write something before clicking Add!")
    }
    else{
      setTodos([...todos, {id: Date.now(), title: title, completed: false }])
      setTitle("");
    }
  };

  const handleToggle = (id:any) => {
    let newTodoList = todos.filter((todo) => {
      if (todo.id === id){
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(newTodoList);
  };
  
  const handleAllClear = () => {
    let newTodoList = todos.filter((todo) => {
      if (!todo.completed)
        return todo;
    });
    setTodos(newTodoList);
  };

  const handleDelete = (id:any) => {
    let newTodoList = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(newTodoList);
  };


  return (
    <Flex align={'center'} justify={'center'}>
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}>
        <Heading color={"green.500"} lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
          Shoaib Todo App - {todos.length}
        </Heading>
        <Text
          fontSize={{ base: 'sm', sm: 'md' }}
          color={useColorModeValue('gray.800', 'gray.400')}>
          Add Todo here!
        </Text>
        <FormControl id="email">
          <Input
            placeholder="Bring Groceries"
            _placeholder={{ color: 'green.500' }}
            type="text"
            value={title}
            onChange={(e)=> setTitle(e.target.value)}
          />
        </FormControl>
        <Stack spacing={6}>
          <Button
            type="submit"
            bg={'green.400'}
            color={'white'}
            _hover={{
              bg: 'green.900',
            }}
            onClick = {() => handleAdd()}
            >
            Add
          </Button>
        </Stack>
        <Stack>
          <ul>
            {todos.map(todo => (
                <li>
                  {todo.title} -{" "} 
                  <Badge colorScheme={todo.completed ? "green" : "red"}> 
                  {todo.completed ? "completed" : "incomplete"}
                  </Badge>
                  <Button size={"sm"} marginX={"5"} onClick = {() => handleToggle(todo.id)}>Status Switch</Button>
                  <Badge colorScheme={todo.completed ? "green" : "red"}> 
                  </Badge>
                  <Button leftIcon={<MdDelete/>} size={"sm"} onClick = {() => handleDelete(todo.id)}>Delete</Button>
                </li>
              ))}
          </ul>
          <Button onClick={() => handleAllClear()}>Clear all Completed Todos!</Button>
        </Stack>
      </Stack>
    </Flex>
  );
}