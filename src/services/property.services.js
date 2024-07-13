const Property = require('../model/property.model');

module.exports = class propertyService {

    async addProperty(body){
        try {
            const property = new Property(body);
            await property.save();
            return property;
        } catch (error) {
            throw error;
        }
    }
    

    async getProperty(body){
        try {
            
            const item = await Property.find(body);
            return item;
            
        } catch (error) {
            return error;
            
        }
     };
    

    
    async getAllProperty(body){
        try {
            return await Property.find(body)
            
        } catch (error) {
            return error;
            
        }
    
    };


    async getAllProperty(query) {
        try {
          // Pagination
          let pageNo = Number(query.pageNo || 1);
          let perPage = Number(query.perPage || 4);
          let skip= (pageNo - 1) * perPage;
    
          // Search with keyword
          let search =
            query.search && query.search !== ""
              ? [
                  {
                    $match: {
                      $or: [
                        {
                          propertyName: {
                            $regex: query.search.trim().replace(/\s+/g, " "),
                            $options: "i",
                          },
                        },
                        {
                          description: {
                            $regex: query.search.trim().replace(/\s+/g, " "),
                            $options: "i",
                          },
                        },
                        {
                          category: {
                            $regex: query.search.trim().replace(/\s+/g, " "),
                            $options: "i",
                          },
                        },
                      ],
                    },
                  },
                ]
              : [];
    
          // category wise listing
          let categoryWise =
            query.category && query.category !== ""
              ? [
                  {
                    $match: {
                      category: {
                        $regex: query.category.trim().replace(/\s+/g, " "),
                        $options: "i",
                      },
                    },
                  },
                ]
              : [];
              
          // Product by id
          let propertyById =
            query.propertyById && query.propertyById !== ""
              ? [
                  {
                    $match: {
                      _id: new mongoose.Types.ObjectId(query.propertyById),
                    },
                  },
                ]
               : [];
            
    
          let find = [
            { $match: { isDelete: false } },
            ...categoryWise,
            ...search,
            ...propertyById,
            // {
            //   $skip: skip,
            // },
            // {
            //   $limit: perPage,
            // },
          ];
          let totalCounts = await Property.aggregate(find);
          let results = await Property.aggregate(find,{ $skip: skip }, { $limit: perPage });
          let totalPages = Math.ceil(totalCounts.length / perPage);
    
          return {
            totalCounts: totalCounts.length,
            totalPages: totalPages,
            currentPage: pageNo,
            result: results,
          };
        } catch (error) {
          console.log(error);
          return error;
        }
      }



      async updateProperty(id,body) {
        try {
          return await Property.findByIdAndUpdate(id, { $set: body }, { new: true } , {isDelete: true});
        } catch (error) {
          return error.message;
        }
      }
    
    
      async deleteProperty(id,body){
        try {
            return await Property.findByIdAndUpdate(id, { $set: { ...body, isDelete: true } }, { new: true }); 
        } catch (error) {
            return error;
            
        }
    }


    
    

    
    
}