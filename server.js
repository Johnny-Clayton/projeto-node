import { fastify } from 'fastify'
import { DatabasePostgress } from './database-postgres.js'

const server = fastify()

const database = new DatabasePostgress()

server.post('/videos', async (resquest, response) => {

    const {title, description, duration} = resquest.body


    await database.create({
        title,
        description,
        duration,
    })

    return response.status(201).send()
})

server.get('/videos', async (resquest) => {
    const search = resquest.query.search

    console.log(search)

    const videos = await database.list(search)

    console.log(videos)

    return videos
})

server.put('/videos/:id', async (resquest) => {
    const videoId = resquest.params.id
    const {title, description, duration} = resquest.body

    await database.update(videoId, {
        title,
        description,
        duration,
    })

    return response.status(204).send()
})

server.delete('/videos/:id', async (resquest, response) => {
    const videoId = resquest.params.id

    await database.delete(videoId)

    return response.status(204).send()
})

server.listen({
    host: '0.0.0.0',
    port: process.env.PORT ?? 3333,
})
