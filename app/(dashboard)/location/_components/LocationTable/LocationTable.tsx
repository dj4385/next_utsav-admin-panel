"use client";

import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { LocationService } from "@/services/location.service";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { setAddLocationSuccess } from "@/lib/features/EventsSlice";
import Image from "next/image";

const LocationTable = () => {
  const [locationList, setLocationList] = useState<any[]>([]);
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const { isAddLocationSuccess } = useAppSelector((state) => state.EventsSlice);

  const getLocationList = async () => {
    try {
      const res: any = await LocationService.getAllLocationsList();
      if (res && res.status == 200 && res.data.data.length) {
        setLocationList(res.data.data);
        dispatch(setAddLocationSuccess(false));
      }
    } catch (error) {}
  };

  const deleteData = async (id: string) => {
    try {
      const res: any = await LocationService.deleteLocation(id);
      if (res && res.status) {
        toast({
          title: "Success",
          description: "Location deleted successfully",
        });
        getLocationList();
      } else {
        toast({
          title: "Error",
          description: "Unable to delete location",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    getLocationList();
  }, []);

  useEffect(() => {
    if (isAddLocationSuccess) {
      getLocationList();
    }
  }, [isAddLocationSuccess]);

  return (
    <div className="border-[2px] rounded-lg overflow-hidden w-full bg-white">
      <div className="p-2">
        <Table className="rounded-md">
          <TableHeader>
            <TableRow className="bg-purple-600 hover:bg-purple-600 text-white">
              <TableHead className="text-white">S.No</TableHead>
              <TableHead className="text-white">Image</TableHead>
              <TableHead className="text-white">Name</TableHead>
              <TableHead className="text-white">City</TableHead>
              <TableHead className="text-white">State</TableHead>
              <TableHead className="text-white">Address</TableHead>
              <TableHead className="text-white text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {locationList?.length
              ? locationList.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      {item?.image ? (
                        <div className="h-[50px] w-[50px]">
                          {" "}
                          <Image
                            src={item?.image}
                            className="h-full w-full rounded-md"
                            alt="location"
                            width={50}
                            height={50}
                          />{" "}
                        </div>
                      ) : null}
                    </TableCell>
                    <TableCell>{item?.name || ""}</TableCell>
                    <TableCell>{item?.city || ""}</TableCell>
                    <TableCell>{item?.state || ""}</TableCell>
                    <TableCell>{item?.address || ""}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => deleteData(item._id)}
                        >
                          <Trash2 />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default LocationTable;
