import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SystemSourceEnum } from '../../../constants';
import { Lead } from '../../../domains';


@Entity()
export class LeadEntity implements Lead {
  @PrimaryGeneratedColumn('uuid') _id: string;
  @Column() systemSourceEnum: SystemSourceEnum = SystemSourceEnum.Dealer365;
  @Column() firstName?: string;
  @Column() lastName: string;
  @Column() fullName?: string;
  @Column() comment?: string;
  @Column() addresses?: string;
  @Column() contacts?: string;
  @Column() isConvertedToContact: boolean = false;
  @Column() createdDateTimeUTC: Date;
  @Column() creatorUserId: string;
  @Column() creatorUserName: string;
  @Column() updatedDateTimeUTC?: Date;
  @Column() updaterUserId?: string;
  @Column() updaterUserName?: string;
}