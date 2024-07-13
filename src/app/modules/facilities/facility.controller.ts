import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { FacilityServices } from './facility.service';

const createFacility = catchAsync(async (req, res) => {
  const data = await FacilityServices.createFacilityIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Facility added successfully',
    data,
  });
});

const updateFacility = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = await FacilityServices.updateFacilityIntoDB(id, req.body);

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
  const data = await FacilityServices.getAllFacilityFromDB();

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
};
