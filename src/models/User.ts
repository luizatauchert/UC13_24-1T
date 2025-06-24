import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BeforeInsert,
    BeforeUpdate,
    AfterLoad
  } from "typeorm";
  import bcrypt from "bcryptjs";
  
  @Entity("users")
  export class User {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column({ type: "varchar", length: 255 })
    name!: string;
  
    @Column({ unique: true })
    email!: string;
  
    @Column({ length: 255 })
    password!: string;
  
    private _previousPassword?: string;
  
    @AfterLoad()
    setPreviousPassword() {
      this._previousPassword = this.password;
    }
  
    @BeforeInsert()
    async hashPasswordBeforeInsert() {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
  
    @BeforeUpdate()
    async hashPasswordBeforeUpdate() {
      if (this.password !== this._previousPassword) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
      }
    }
  
    async comparePassword(input: string): Promise<boolean> {
      return await bcrypt.compare(input, this.password);
    }
  }
  