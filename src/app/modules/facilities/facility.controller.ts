import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { FacilityServices } from './facility.service';
import AppError from '../../errors/AppError';

const createFacility = catchAsync(async (req, res) => {
  const imgUrl = req.file?.path;

  if (!imgUrl) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Image is required');
  }

  const data = await FacilityServices.createFacilityIntoDB(imgUrl, req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'Facility added successfully',
    data,
  });
});

const updateFacility = catchAsync(async (req, res) => {
  const imgUrl = req.file?.path;

  const { id } = req.params;
  const data = await FacilityServices.updateFacilityIntoDB(
    id,
    req.body,
    imgUrl,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Facility updated successfully',
    data,
  });
});

const deleteFacility = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = await FacilityServices.deleteFacilityFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Facility deleted successfully',
    data,
  });
});

const getAllFacility = catchAsync(async (req, res) => {
  const query = req.query as Record<string, string>;
  const { data, meta } = await FacilityServices.getAllFacilityFromDB(query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: `${
      data.length === 0
        ? 'No facility found'
        : 'Facility retrieved successfully'
    }`,
    data,
    meta,
  });
});

const getSingleFacility = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = await FacilityServices.getSingleFacilityFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Facility retrieved successfully',
    data,
  });
});

export const FacilityControllers = {
  createFacility,
  updateFacility,
  deleteFacility,
  getAllFacility,
  getSingleFacility,
};
