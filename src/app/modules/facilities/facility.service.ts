import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TFacility } from './facility.interface';
import { Facility } from './facility.model';
import QueryBuilder from '../../builder/QueryBuilder';

// create facility
const createFacilityIntoDB = async (payload: TFacility) => {
  const result = await Facility.create(payload);
  return result;
};

// update facility
const updateFacilityIntoDB = async (
  id: string,
  payload: Partial<TFacility>,
) => {
  const result = await Facility.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Facility is not found');
  }

  return result;
};

// soft delete facility
const deleteFacilityFromDB = async (id: string) => {
  const result = await Facility.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Facility is not found');
  }

  return result;
};

// get all facility
const getAllFacilityFromDB = async (query: Record<string, string>) => {
  const facilityQuery = new QueryBuilder(
    Facility.find({
      isDeleted: { $ne: true },
    }),
    query,
  )
    .search(['name', 'description', 'location'])
    .filter()
    .fields()
    .sort();

  const meta = await facilityQuery.countTotal();

  // pagination
  facilityQuery.paginate();

  const data = await facilityQuery.modelQuery;

  return {
    data,
    meta,
  };
};

export const FacilityServices = {
  createFacilityIntoDB,
  updateFacilityIntoDB,
  deleteFacilityFromDB,
  getAllFacilityFromDB,
};
