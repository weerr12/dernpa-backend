import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateTrailDto } from './dto/create-trail.dto';
import { UpdateTrailDto } from './dto/update-trail.dto';
import { CreateParkDto } from './dto/create-park.dto';
import { CreateGuideDto } from './dto/create-guide.dto';
import { TrailResponseDto } from './dto/trail-response.dto';
import { DeleteResponseDto } from './dto/delete-response.dto';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {
    //
  }
  // =========================== Trails ===========================
  async getAllTrails() {
    try {
      const trails = await this.prisma.trail.findMany({
        include: {
          park: {
            select: {
              id: true,
              park_name: true,
              park_type: true,
              location_province: true, // จังหวัด
              location_district: true, // อำเภอ
              location_subdistrict: true, // ตำบล
            },
          },
          _count: {
            select: {
              reviews: true,
              photos: true,
              favorite_trails: true,
            },
          },
        },
        orderBy: { created_at: 'asc' },
      });

      return {
        success: true,
        data: trails,
        message: 'Trails retrieved successfully',
      };
    } catch (error) {
      console.error('Error fetching trails:', error);
      throw new BadRequestException('Failed to fetch trails');
    }
  }

  async getTrailById(id: number): Promise<TrailResponseDto> {
    try {
      const trail = await this.prisma.trail.findUnique({
        where: { id },
        include: {
          park: {
            select: {
              id: true,
              park_name: true,
              park_type: true,
              location_province: true, // จังหวัด
              location_district: true, // อำเภอ
              location_subdistrict: true, // ตำบล
            },
          },
          trail_features: {
            select: {
              id: true,
              feature_type: true,
              feature_name: true,
              description: true,
            },
          },
          trail_wildlife: {
            select: {
              id: true,
              animal_name: true,
              animal_type: true,
              rarity: true,
              best_time_to_spot: true,
              description: true,
            },
          },
          facilities: {
            select: {
              id: true,
              facility_type: true,
              latitude: true,
              longitude: true,
            },
          },
          safety_info: {
            select: {
              id: true,
              risk_type: true,
              latitude: true,
              longitude: true,
            },
          },
          _count: {
            select: {
              reviews: true,
              photos: true,
              favorite_trails: true,
            },
          },
        },
      });

      if (!trail) {
        throw new NotFoundException('Trail not found');
      }

      return {
        success: true,
        data: trail,
        message: 'Trail retrieved successfully',
      };
    } catch (error) {
      console.error('Error fetching trail by ID:', error);
      throw new BadRequestException('Failed to fetch trail by ID');
    }
  }

  async createTrail(createTrailDto: CreateTrailDto): Promise<TrailResponseDto> {
    try {
      // ตรวจสอบว่า park มีอยู่จริง
      const park = await this.prisma.park.findUnique({
        where: { id: createTrailDto.park_id },
      });
      if (!park) {
        throw new BadRequestException('Invalid park_id: Park does not exist');
      }

      // ตรวจสอบว่าชื่อ trail ซ้ำในอุทยานเดียวกันหรือไม่
      const existingTrail = await this.prisma.trail.findFirst({
        where: {
          trail_name: createTrailDto.trail_name,
          park_id: createTrailDto.park_id,
        },
      });
      if (existingTrail) {
        throw new BadRequestException(
          'Trail with this name already exists in this park',
        );
      }

      const trail = await this.prisma.trail.create({
        data: { ...createTrailDto },
        include: {
          park: {
            select: {
              id: true,
              park_name: true,
              park_type: true,
              location_province: true,
              location_district: true,
              location_subdistrict: true,
            },
          },
        },
      });

      return {
        success: true,
        data: trail,
        message: 'Trail created successfully',
      };
    } catch (error) {
      console.error('Error creating trail:', error);
      throw new BadRequestException('Failed to create trail');
    }
  }

  async updateTrail(
    id: number,
    updateTrailDto: UpdateTrailDto,
  ): Promise<TrailResponseDto> {
    try {
      // ตรวจสอบว่า trail มีอยู่จริง
      const existingTrail = await this.prisma.trail.findUnique({
        where: { id },
      });
      if (!existingTrail) {
        throw new NotFoundException('Trail not found');
      }

      const updatedTrail = await this.prisma.trail.update({
        where: { id },
        data: { ...updateTrailDto },
        include: {
          park: {
            select: {
              id: true,
              park_name: true,
              park_type: true,
              location_province: true,
              location_district: true,
              location_subdistrict: true,
            },
          },
        },
      });

      return {
        success: true,
        data: updatedTrail,
        message: 'Trail updated successfully',
      };
    } catch (error) {
      console.error('Error updating trail:', error);
      throw new BadRequestException('Failed to update trail');
    }
  }

  async deleteTrail(id: number): Promise<DeleteResponseDto> {
    try {
      // ตรวจสอบว่า trail มีอยู่จริง
      const trail = await this.prisma.trail.findUnique({
        where: { id },
        include: {
          _count: {
            select: {
              reviews: true,
              photos: true,
              favorite_trails: true,
              diary: true,
              guide_bookings: true,
            },
          },
        },
      });

      if (!trail) {
        throw new NotFoundException('Trail not found');
      }

      await this.prisma.trail.delete({ where: { id } });

      return {
        success: true,
        message: 'Trail deleted successfully',
      };
    } catch (error) {
      console.error('Error deleting trail:', error);
      throw new BadRequestException('Failed to delete trail');
    }
  }

  // =========================== Parks ===========================
  async getAllParks() {
    try {
      const parks = await this.prisma.park.findMany({
        include: {
          _count: {
            select: {
              trails: true,
            },
          },
        },
        orderBy: { created_at: 'asc' },
      });
      return {
        success: true,
        data: parks,
        message: 'Get parks successfully',
      };
    } catch (error) {
      console.error('Error fetching parks:', error);
      throw new BadRequestException('Failed to fetch parks');
    }
  }

  async getParkById(id: number) {
    try {
      const park = await this.prisma.park.findUnique({
        where: { id },
        include: {
          trails: {
            select: {
              id: true,
              trail_name: true,
              trail_description: true,
              difficulty_level: true,
              length_kilometer: true,
              duration_estimated: true,
              elevation_gain: true,
              elevation_max: true,
              latitude_start: true,
              longitude_start: true,
              latitude_end: true,
              longitude_end: true,
              best_time_to_visit: true,
              best_walking_time: true,
              trail_type: true,
            },
          },
          _count: {
            select: {
              trails: true,
            },
          },
        },
      });

      if (!park) {
        throw new NotFoundException('Park not found');
      }

      return {
        success: true,
        data: park,
        message: 'Get Park By ID successfully',
      };
    } catch (error) {
      console.error('Error fetching park by ID:', error);
      throw new BadRequestException('Failed to fetch park by ID');
    }
  }

  async createPark(createParkDto: CreateParkDto) {
    try {
      const park = await this.prisma.park.create({
        data: {
          ...createParkDto,
        },
      });

      return {
        success: true,
        data: park,
        message: 'Park created successfully',
      };
    } catch (error) {
      console.error('Error creating park:', error);
      throw new BadRequestException('Failed to create park');
    }
  }

  async updatePark(id: number, createParkDto: CreateParkDto) {
    try {
      const existingPark = await this.prisma.park.findUnique({ where: { id } });
      if (!existingPark) {
        throw new NotFoundException('Park not found');
      }

      const updatedPark = await this.prisma.park.update({
        where: { id },
        data: { ...createParkDto },
      });

      return {
        success: true,
        data: updatedPark,
        message: 'Park updated successfully',
      };
    } catch (error) {
      console.error('Error updating park:', error);
      throw new BadRequestException('Failed to update park');
    }
  }

  async deletePark(id: number) {
    try {
      const park = await this.prisma.park.findUnique({
        where: { id },
        include: {
          _count: {
            select: {
              trails: true,
            },
          },
        },
      });

      if (!park) {
        throw new NotFoundException('Park not found');
      }
      await this.prisma.park.delete({ where: { id } });

      return {
        success: true,
        message: 'Park deleted successfully',
      };
    } catch (error) {
      console.error('Error deleting park:', error);
      throw new BadRequestException('Failed to delete park');
    }
  }

  // =========================== Guides ===========================
  async getAllGuides() {
    try {
      const guides = await this.prisma.guideProfile.findMany({
        include: {
          user: {
            select: {
              id: true,
              username: true,
              role: true,
              email: true,
              phone: true,
              profile_picture_url: true,
            },
          },
          trail: {
            select: {
              id: true,
              trail_name: true,
              park: {
                select: {
                  park_name: true,
                  park_type: true,
                  location_province: true,
                  location_district: true,
                  location_subdistrict: true,
                },
              },
            },
          },
          _count: {
            select: {
              guide_bookings: true,
            },
          },
        },
        orderBy: { created_at: 'asc' },
      });

      return {
        success: true,
        data: guides,
        message: 'Get Guides successfully',
      };
    } catch (error) {
      console.error('Error fetching guides:', error);
      throw new BadRequestException('Failed to fetch guides');
    }
  }

  async getGuideById(id: number) {
    try {
      const guide = await this.prisma.guideProfile.findUnique({
        where: { id },
        include: {
          user: {
            select: {
              id: true,
              username: true,
              email: true,
              phone: true,
              profile_picture_url: true,
              created_at: true,
            },
          },
          trail: {
            select: {
              id: true,
              trail_name: true,
              park: {
                select: {
                  id: true,
                  park_name: true,
                  park_type: true,
                  location_province: true,
                  location_district: true,
                  location_subdistrict: true,
                },
              },
            },
          },
          guide_bookings: {
            select: {
              id: true,
              booking_date: true,
              status: true,
              total_price: true,
              user: {
                select: {
                  username: true,
                },
              },
              trail: {
                select: {
                  trail_name: true,
                },
              },
            },
            orderBy: { created_at: 'asc' },
            take: 5, // แสดงการจอง 5 รายการล่าสุด
          },
          _count: {
            select: {
              guide_bookings: true,
            },
          },
        },
      });

      if (!guide) {
        throw new NotFoundException('Guide not found');
      }

      return {
        success: true,
        data: guide,
        message: 'Guide retrieved successfully',
      };
    } catch (error) {
      console.error('Error fetching guide by ID:', error);
      throw new BadRequestException('Failed to fetch guide by ID');
    }
  }

  async createGuide(createGuideDto: CreateGuideDto) {
    try {
      // ตรวจสอบว่า user มีอยู่จริง
      const user = await this.prisma.user.findUnique({
        where: { id: createGuideDto.user_id },
      });
      if (!user) {
        throw new BadRequestException('Invalid user_id: User does not exist');
      }

      // ตรวจสอบว่า user มี role เป็น admin หรือไม่
      if (user.role !== 'admin') {
        throw new BadRequestException(
          'User must have "admin" role to create guide profile',
        );
      }
      if (createGuideDto.trail_ids && createGuideDto.trail_ids.length > 0) {
        const trails = await this.prisma.trail.findMany({
          where: {
            id: {
              in: createGuideDto.trail_ids,
            },
          },
        });
        if (trails.length !== createGuideDto.trail_ids.length) {
          throw new BadRequestException('One or more trail IDs are invalid');
        }
      }
      const guide = await this.prisma.guideProfile.create({
        data: {
          user_id: createGuideDto.user_id,
          bio: createGuideDto.bio,
          experience_years: createGuideDto.experience_years || 0,
          is_available: createGuideDto.is_available ?? true,
          price_rate: createGuideDto.price_rate,
        },
        include: {
          user: {
            select: {
              id: true,
              username: true,
              email: true,
            },
          },
          trail: {
            select: {
              id: true,
              trail_name: true,
              park: {
                select: {
                  park_name: true,
                },
              },
            },
          },
        },
      });

      return {
        success: true,
        data: guide,
        message: 'Guide created successfully',
      };
    } catch (error) {
      console.error('Error creating guide:', error);
      throw new BadRequestException('Failed to create guide');
    }
  }

  async updateGuide(id: number, updateGuideDto: CreateGuideDto) {
    try {
      // ตรวจสอบว่า guide มีอยู่จริง
      const existingGuide = await this.prisma.guideProfile.findUnique({
        where: { id },
        include: {
          trail: true,
        },
      });
      if (!existingGuide) {
        throw new NotFoundException('Guide not found');
      }

      if (updateGuideDto.trail_ids && updateGuideDto.trail_ids.length > 0) {
        const trails = await this.prisma.trail.findMany({
          where: {
            id: {
              in: updateGuideDto.trail_ids,
            },
          },
        });
        if (trails.length !== updateGuideDto.trail_ids.length) {
          throw new BadRequestException('One or more trail IDs are invalid');
        }
      }

      const updatedGuide = await this.prisma.guideProfile.update({
        where: { id },
        data: {
          ...(updateGuideDto.user_id && { user_id: updateGuideDto.user_id }),
          ...(updateGuideDto.bio !== undefined && { bio: updateGuideDto.bio }),
          ...(updateGuideDto.experience_years !== undefined && {
            experience_years: updateGuideDto.experience_years,
          }),
          ...(updateGuideDto.price_rate !== undefined && {
            price_rate: updateGuideDto.price_rate,
          }),
          ...(updateGuideDto.is_available !== undefined && {
            is_available: updateGuideDto.is_available,
          }),
          ...(updateGuideDto.trail_ids && {
            trail: {
              set: [], // ยกเลิกการเชื่อมทั้งหมดก่อน
              connect: updateGuideDto.trail_ids.map((id) => ({ id })),
            },
          }),
        },
        include: {
          user: {
            select: {
              id: true,
              username: true,
              email: true,
              phone: true,
            },
          },
          trail: {
            select: {
              id: true,
              trail_name: true,
              park: {
                select: {
                  park_name: true,
                },
              },
            },
          },
        },
      });

      return {
        success: true,
        data: updatedGuide,
        message: 'Guide updated successfully',
      };
    } catch (error) {
      console.error('Error updating guide:', error);
      throw new BadRequestException('Failed to update guide');
    }
  }

  async deleteGuide(id: number) {
    try {
      const guide = await this.prisma.guideProfile.findUnique({
        where: { id },
        include: {
          _count: {
            select: {
              guide_bookings: true,
            },
          },
        },
      });

      if (!guide) {
        throw new NotFoundException('Guide not found');
      }

      await this.prisma.guideProfile.delete({ where: { id } });

      return {
        success: true,
        message: 'Guide deleted successfully',
      };
    } catch (error) {
      console.error('Error deleting guide:', error);
      throw new BadRequestException('Failed to delete guide');
    }
  }

  // =========================== Reviews ===========================
  async getReviews() {
    const reviews = await this.prisma.review.findMany({
      orderBy: { created_at: 'asc' },
      include: {
        user: true,
        trail: true,
      },
    });
    return reviews;
  }

  // =========================== Users ===========================
  async getUsers() {
    try {
      const users = await this.prisma.user.findMany({
        select: {
          id: true,
          username: true,
          email: true,
          role: true,
          phone: true,
          profile_picture_url: true,
          _count: {
            select: {
              reviews: true,
              photos: true,
              favorite_trails: true,
              diary: true,
              guide_bookings: true,
            },
          },
          guide_profile: {
            select: {
              id: true,
              bio: true,
              experience_years: true,
              average_rating: true,
              total_bookings: true,
              is_available: true,
              price_rate: true,
            },
          },
        },
        orderBy: { created_at: 'asc' },
      });

      return {
        success: true,
        data: users,
        total: users.length,
        message: 'Users retrieved successfully',
      };
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new BadRequestException('Failed to fetch users');
    }
  }

  async changeUserRole(id: number, role: string) {
    try {
      const existingUser = await this.prisma.user.findUnique({
        where: { id },
      });

      if (!existingUser) {
        throw new NotFoundException('User not found');
      }
      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: { role },
        select: {
          id: true,
          username: true,
          email: true,
          role: true,
          phone: true,
          profile_picture_url: true,
          created_at: true,
          _count: {
            select: {
              reviews: true,
              photos: true,
              favorite_trails: true,
              diary: true,
              guide_bookings: true,
            },
          },
          guide_profile: {
            select: {
              id: true,
              bio: true,
              experience_years: true,
              average_rating: true,
              total_bookings: true,
              is_available: true,
              price_rate: true,
            },
          },
        },
      });

      return {
        success: true,
        data: updatedUser,
        message: `User role changed to ${role} successfully`,
        previous_role: existingUser.role,
      };
    } catch (error) {
      console.error('Error changing user role:', error);
      throw new BadRequestException('Failed to change user role');
    }
  }
}
