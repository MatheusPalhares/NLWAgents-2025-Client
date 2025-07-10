import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod/v4'
import { useCreateRoom } from '@/http/use-create-room'
import { Button } from './ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'

const CreateRoomFormSchema = z.object({
  name: z.string().min(3, 'O nome da sala é obrigatório'),
  description: z.string(),
})

type CreateRoomFormData = z.infer<typeof CreateRoomFormSchema>

export function CreateRoomForm() {
  const { mutateAsync: CreateRoom } = useCreateRoom()

  const CreateRoomForm = useForm<CreateRoomFormData>({
    resolver: zodResolver(CreateRoomFormSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  })

  async function handleCreateRoom({ name, description }: CreateRoomFormData) {
    await CreateRoom({
      name,
      description,
    })
    CreateRoomForm.reset()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle> Criar sala </CardTitle>
        <CardDescription>
          Crie uma nova sala para começar a fazer perguntas e receber respostas
          da I.A
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...CreateRoomForm}>
          <form
            className="flex flex-col gap-4"
            onSubmit={CreateRoomForm.handleSubmit(handleCreateRoom)}
          >
            <FormField
              control={CreateRoomForm.control}
              name="name"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Nome da sala</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Digite o nome da sala" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            <FormField
              control={CreateRoomForm.control}
              name="description"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />

            <Button className="w-full" type="submit">
              Criar Sala
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
