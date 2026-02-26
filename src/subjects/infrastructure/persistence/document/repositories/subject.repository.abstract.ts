import { Subject } from '../../../../domain/subject';
import { BaseRepository } from '../../../../../core/base/base.repository';
import {
  SubjectDocument,
  SubjectDocumentType,
} from '../schemas/subject.schema';

export abstract class SubjectRepositoryAbstract extends BaseRepository<
  Subject,
  SubjectDocument,
  SubjectDocumentType
> {
  abstract findAllSubjects(): Promise<Subject[]>;
  abstract findBySlug(slug: string): Promise<Subject | null>;
}
