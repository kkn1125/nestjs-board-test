import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { BoardService } from './board.service';

@Injectable()
export class BoardPipe implements PipeTransform {
  constructor(private readonly boardService: BoardService) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    console.log('value', value, metadata);
    const boards = await this.boardService.findAll({ page: value });
    return boards;
  }
}
