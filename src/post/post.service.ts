import { Injectable } from '@nestjs/common';
import { Post, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  // Crear un nuevo post
  async createPost(data: Prisma.PostCreateInput): Promise<Post> {
    return this.prisma.post.create({
      data,
    });
  }

  // Obtener todos los posts
  async getAll(): Promise<Post[]> {
    return this.prisma.post.findMany();
  }

  // Obtener un post por id
  async getPostById(postId: number): Promise<Post> {
    return this.prisma.post.findUnique({
      where: {
        id: Number(postId),
      },
    });
  }

  // Obtener posts por idioma
  async getPostsByLanguage(language: string): Promise<Post[]> {
    return this.prisma.post.findMany({
      where: {
        language,
      },
    });
  }

  // Actualizar un post
  async updatePost(
    postId: number,
    data: Prisma.PostUpdateInput,
  ): Promise<Post> {
    return this.prisma.post.update({
      where: {
        id: Number(postId),
      },
      data,
    });
  }

  // Eliminar un post
  async deletePost(postId: number): Promise<Post> {
    return this.prisma.post.delete({
      where: {
        id: Number(postId),
      },
    });
  }
}
