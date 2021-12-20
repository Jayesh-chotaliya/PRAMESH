<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Api extends MX_Controller 
{
    public function __construct() {
        parent::__construct();
        $this->load->library('general');
        $this->load->model('content/content_model');
		$this->load->model('stories/stories_model');
		$this->load->model('product/product_model');
		$this->load->model('category/category_model');
		$this->load->model('variants/variants_model');
		$this->load->model('order/order_model');
		$this->load->model('login/login_model');
		$this->load->model('register/register_model');
        header('Content-Type: application/json');
		header('Access-Control-Allow-Origin: *');
    }

	public function login()
	{	
		$error = false;

		$login    = $this->input->post('vEmail');
		$password = $this->input->post('vPassword');

		if(empty($login))
		{
			$error = true;
			$data['message'] = array('Output' => 1, 'Message' => 'Email is required');
		}
		if(empty($password))
		{
			$error = true;
			$data['message'] = array('Output' => 1, 'Message' => 'Password is required');
		}

		if($error == false)
		{
			$result     = $this->login_model->login($login, md5($password));

		

			if(count($result) > 0)
			{	
				if($result->eStatus == 'Active')
				{
					$data['estatus']     	= "0";
					$data['message'] 		= 'Login Successfully';
					$data['vUserName']	    = $result->vUserName;
					$data['iAdminId']	    = $result->iAdminId;
				}
				else 
				{
					$data['estatus']     	= "1";
					$data['message'] 		= 'Status Not Active';
				}
			} 	 
			else 
			{	
				$data['estatus']     = "1";
				$data['message']    = 'Email and Password Incorect!';
			}
		}
	
		echo json_encode($data);
		exit;

	}

	public function banner_add()
	{	
		$iBannerId = $_POST['iBannerId'];

	    $data['vTitle']              	= $_POST['vTitle'];
        $data['iOrder']       			= $_POST['vOrder'];
        $data['tDescription']           = $_POST['vdesc'];
        $data['dtAddedDate']            = date("Y-m-d h:i:s");
        $data['eStatus']            	= $_POST['eStatus'];
        $data['vBannerType']            = $_POST['vBannerType'];
			
		if($_FILES['vImage']['name'] != "")
        {
            if($_FILES['vImage']['type'] == 'image/jpg'){
                $ext = ".jpg";
            } else if($_FILES['vImage']['type'] == 'image/jpeg'){
                $ext = ".jpeg";
            } else if($_FILES['vImage']['type'] == 'image/png'){
                $ext = ".png";
            }

            $image = time().$ext;
			$tmp_name = $_FILES["vImage"]["tmp_name"];
            $base_path = $this->config->item('base_path');
		
            $directory = $base_path."/pramesh/backend/image/banner/";
		
            $save_path = base_url("/image/banner/");
            
            mkdir($directory, 0777, TRUE);

             $p = $directory.$image;
			move_uploaded_file($tmp_name, $p);

        
            $data['vImage'] =  $save_path.'/'.$image;
        }
		
		if($iBannerId=="")
		{
			$result   = $this->content_model->add_banner($data);
			if($result)
			{
				$data = array();
				$data['Status'] 		= '0';
				$data['message']  		= 'Banner Added Successfully';
			}
			else
			{
				$data = array();
				$data['Status'] 		= '1';
				$data['message']  		= 'Banner Not Added Please Try!';
			}
		}
		else
		{
			$where = array('iBannerId'=>$iBannerId);
			$result   = $this->content_model->update($where,$data);
			if($result)
			{
				$data = array();
				$data['Status'] 		= '0';
				$data['message']  		= 'Banner Updated  Successfully';
			}
		}
		
		echo json_encode($data);
		exit;

	}

	public function all_banner_get()
	{
		$iBannerId = $_GET['iBannerId'];

		if($_SERVER['REQUEST_METHOD']=='GET' && $iBannerId!="")
		{
			$result  = $this->content_model->get_by_id($iBannerId);

			if(count($result) > 0)
			{
				$data['Status']     = '1';
				$data['message']  	= 'Banner Data Get Successfully';
				$data['data']       = $result;
			}
			else
			{
				$data['Status']     = '0';
				$data['message']  	= 'Data Not Found';
				$data['data']     	= array();
			}
		}
		else
		{
			$result     		= $this->content_model->get_by_all_banner();
			if(count($result) > 0)
			{
				$data['Status']     = '1';
				$data['message']  	= 'Banner Data Get Successfully';
				$data['data']       = $result;
			}
			else
			{
				$data['Status']     = '0';
				$data['message']  	= 'Data Not Found';
				$data['data']     	= array();
			}
		}
		
		
		
 		echo json_encode($data);
	}

	public function delete()
	{
		$iBannerId  = $this->input->post('iBannerId');
	
		$id = $this->content_model->delete_by_id($iBannerId);
		
		$data['Status']     = '0';
		$data['message']  	= 'Banner Deleted Successfully';
			
		echo json_encode($data);
	}

	public function image_content_added()
	{	
		
		$iContentId = $_POST['iContentId'];

	    $data['vTitle']              	= $_POST['vTitle'];
        $data['tDescription']           = $_POST['tDesc'];
        $data['dtAddedDate']            = date("Y-m-d h:i:s");
        $data['eStatus']            	= $_POST['eStatus'];
        $data['vImageType']            	= $_POST['vImageType'];
	
		if($_FILES['vImage']['name'] != "")
        {

            if($_FILES['vImage']['type'] == 'image/jpg'){
                $ext = ".jpg";
            } else if($_FILES['vImage']['type'] == 'image/jpeg'){
                $ext = ".jpeg";
            } else if($_FILES['vImage']['type'] == 'image/png'){
                $ext = ".png";
            }

            $image = time().$ext;

            $base_path = $this->config->item('base_path');
		
            $directory = $base_path."/pramesh/backend/image/Image_content/";
		
            $save_path = base_url("/image/Image_content/");
            
            mkdir($directory, 0777, TRUE);

            $config = array(
                'file_name' => $image,
                'upload_path' => $directory,
                'allowed_types' => "gif|jpg|png|jpeg",
            );

            $this->load->library('upload', $config);

            if(!$this->upload->do_upload('vImage'))   {
                echo "<pre>";
                print_r($this->upload->display_errors());
                exit;
            }

            $data['vImage'] =  $save_path.'/'.$image;
        }

		if($iContentId=='')
		{
			$result   = $this->content_model->image_content_add($data);
			if($result)
			{
				$data = array();
				$data['Status'] 		= '0';
				$data['message']  		= 'Image Content Added Successfully';
			}
			else
			{
				$data = array();
				$data['Status'] 		= '1';
				$data['message']  		= 'Image Content Not Added Please Try!';
			}
		}
		else
		{
			$where = array('iContentId'=>$iContentId);

			$result   = $this->content_model->update_image_content($where,$data);
			if($result)
			{
				$data = array();
				$data['Status'] 		= '0';
				$data['message']  		= 'Image Content Updated  Successfully';
			}
		}
	
		echo json_encode($data);
		exit;

	}

	public function all_image_content_get()
	{
	    $iContentId = $_GET['iContentId'];
	
		if($_SERVER['REQUEST_METHOD']=='GET' && $iContentId!="")
		{
			$result  = $this->content_model->get_image_content_by_id($iContentId);
			
			if(count($result) > 0)
			{
				$data['Status']     = '1';
				$data['message']  	= 'Image Content Data Get Successfully';
				$data['data']       = $result;
			}
			else
			{
				$data['Status']     = '0';
				$data['message']  	= 'Data Not Found';
				$data['data']     	= array();
			}
		}
		else
		{
			$result     		= $this->content_model->get_by_all_image_content();
			if(count($result) > 0)
			{
				$data['Status']     = '1';
				$data['message']  	= 'Image Content Data Get Successfully';
				$data['data']       = $result;
			}
			else
			{
				$data['Status']     = '0';
				$data['message']  	= 'Data Not Found';
				$data['data']     	= array();
			}
		}
		
		
		
 		echo json_encode($data);
	}

	public function image_content_delete()
	{
		$iContentId  = $this->input->post('iContentId');
	
		$id = $this->content_model->delete_by_id_image_content($iContentId);
		
		$data['Status']     = '0';
		$data['message']  	= 'Image Content Deleted Successfully';
			
		echo json_encode($data);
	}

	public function useradd()
	{	
		$iUserId 	= $_POST['iUserId'];

	    $data['vFirstName']              	= $_POST['vFirstName'];
        $data['vLastName']       			= $_POST['vLastName'];
        $data['vEmail']           			= $_POST['vEmail'];
        $data['vPassword']           		= md5($_POST['vPassword']);
        $data['dtAddedDate']            	= date("Y-m-d h:i:s");
        $data['dtUpdatedDate']            	= date("Y-m-d h:i:s");
        $data['eStatus']            		= $_POST['eStatus'];
		


		if($iUserId=="")
		{
			
			$result   = $this->content_model->add_user($data);
			if($result)
			{
				$data = array();
				$data['Status'] 		= '0';
				$data['message']  		= 'User Created Successfully';
			}
			else
			{
				$data = array();
				$data['Status'] 		= '1';
				$data['message']  		= 'User Not Create Please Try!';
			}
		}
		else
		{
			$where = array('iUserId'=>$iUserId);
			$result   = $this->content_model->update_userdata($where,$data);
			if($result)
			{
				$data = array();
				$data['Status'] 		= '0';
				$data['message']  		= 'User Updated  Successfully';
			}
		}
		
		echo json_encode($data);
		exit;

	}

	public function all_user_get()
	{
		$iUserId = $_GET['iUserId'];

		if($_SERVER['REQUEST_METHOD']=='GET' && $iUserId!="")
		{
			$result  = $this->content_model->get_by_user_id($iUserId);

			if(count($result) > 0)
			{
				$data['Status']     = '1';
				$data['message']  	= 'User Data Get Successfully';
				$data['data']       = $result;
			}
			else
			{
				$data['Status']     = '0';
				$data['message']  	= 'Data Not Found';
				$data['data']     	= array();
			}
		}
		else
		{
		
			$result       	= $this->content_model->get_by_all_user();
			$Lastdata       = $this->content_model->get_by_last_data();
			$banner         = $this->content_model->get_by_all_banner();
			$stories        = $this->stories_model->get_by_all_stories();
			$order     		= $this->order_model->get_by_all_order();
			if(count($result) > 0)
			{
				$data['Status']     = '1';
				$data['message']  	= 'User Data Get Successfully';
				$data['data']       = $result;
				$data['count']      = count($result);
				$data['last']      	= $Lastdata;
				$data['banner']     = count($banner);
				$data['stories']    = count($stories);
				$data['order']    	= count($order);
			}
			else
			{
				$data['Status']     = '0';
				$data['message']  	= 'Data Not Found';
				$data['data']     	= array();
			}
		}
		
 		echo json_encode($data);
	}

	public function delete_user()
	{
		$iUserId  = $this->input->post('iUserId');
	
		$id = $this->content_model->delete_by_user_id($iUserId);
		
		$data['Status']     = '0';
		$data['message']  	= 'User Deleted Successfully';
			
		echo json_encode($data);
	}

	//***************************************************STORIES***************************************
	public function all_stories()
	{

		$iStoriesId = $_GET['iStoriesId'];
		
		if($_SERVER['REQUEST_METHOD']=='GET' && $iStoriesId!="")
		{
			$result  = $this->stories_model->get_by_id($iStoriesId);

			if(count($result) > 0)
			{
				$data['Status']     = '1';
				$data['message']  	= 'Stories Data Get Successfully';
				$data['data']       = $result;
			}
			else
			{
				$data['Status']     = '0';
				$data['message']  	= 'Data Not Found';
				$data['data']     	= array();
			}
		}
		else
		{
	
			$result     		= $this->stories_model->get_by_all_stories();
			if(count($result) > 0)
			{
				$data['Status']     = '1';
				$data['message']  	= 'User Data Get Successfully';
				$data['data']       = $result;
			}
			else
			{
				$data['Status']     = '0';
				$data['message']  	= 'Data Not Found';
				$data['data']     	= array();
			}
		}
		
 		echo json_encode($data);
	}

	public function stories_added()
	{	
		$iStoriesId 						= $_POST['iStoriesId'];
	    $data['vTitle']              		= $_POST['vTitle'];
        $data['tDescription']       	    = $_POST['tDesc'];
		$data['eStatus']            		= $_POST['eStatus'];
        $data['dtAddedDate']            	= date("Y-m-d h:i:s");
       
		if($_FILES['vImage']['name'] != "")
        {
            if($_FILES['vImage']['type'] == 'image/jpg'){
                $ext = ".jpg";
            } else if($_FILES['vImage']['type'] == 'image/jpeg'){
                $ext = ".jpeg";
            } else if($_FILES['vImage']['type'] == 'image/png'){
                $ext = ".png";
            }

            $image = time().$ext;
			$tmp_name = $_FILES["vImage"]["tmp_name"];
            $base_path = $this->config->item('base_path');
		
            $directory = $base_path."/pramesh/backend/image/Stories/";
		
            $save_path = base_url("/image/Stories/");
            
            mkdir($directory, 0777, TRUE);

             $p = $directory.$image;
			move_uploaded_file($tmp_name, $p);

            $data['vImage'] =  $save_path.'/'.$image;
        }

		if($_FILES['vvideo']['name'] != "")
        {
			$tmp_name = $_FILES["vvideo"]["tmp_name"];
            if($_FILES['vvideo']['type'] == 'video/mp4')
			{
                $ext = ".mp4";
            } 
			else if($_FILES['vvideo']['type'] == 'video/M4P')
			{
                $ext = ".M4P";
            } 
			else if($_FILES['vvideo']['type'] == 'image/M4P'){
                $ext = ".M4P";
            }

            $image = time().$ext;
			
            $base_path = $this->config->item('base_path');
		
            $directory = $base_path."/pramesh/backend/image/Stories/";
		
            $save_path = base_url("/image/Stories/");
			
			$p = $directory.$image;
			move_uploaded_file($tmp_name, $p);

            mkdir($directory, 0777, TRUE);

            $data['vVideo'] =  $save_path.'/'.$image;
        }
		
		if($iStoriesId=="")
		{
			$result   = $this->stories_model->add($data);
			if($result)
			{
				$data = array();
				$data['Status'] 		= '0';
				$data['message']  		= 'Stories Created Successfully';
			}
			else
			{
				$data = array();
				$data['Status'] 		= '1';
				$data['message']  		= 'Stories Not Create Please Try!';
			}
		}
		else
		{
			$where = array('iStoriesId'=>$iStoriesId);
			$result   = $this->stories_model->update($where,$data);
			if($result)
			{
				$data = array();
				$data['Status'] 		= '0';
				$data['message']  		= 'Stories Updated  Successfully';
			}
		}
		
		echo json_encode($data);
		exit;

	}
    
	public function stories_delete()
	{
		$iStoriesId  = $this->input->post('iStoriesId');
	
		$id = $this->stories_model->delete_by_id($iStoriesId);
		
		$data['Status']     = '0';
		$data['message']  	= 'Stories Deleted Successfully';
			
		echo json_encode($data);
	}
	// ********************************************************PRODUCT*******************************************
	public function all_product()
	{

		$iProductId = $_GET['iProductId'];
		if($_SERVER['REQUEST_METHOD']=='GET' && $iProductId!="")
		{
			$result  	  		= $this->product_model->get_by_id($iProductId);
			$all_image    		= $this->product_model->get_by_all_image($iProductId);
			$sub_cate     		= $this->category_model->get_by_all_subcategory_data($result->iCategoryId);
			$product_variant    = $this->product_model->get_by_all_product_variyant($iProductId);

			if(count($result) > 0)
			{
				$data['Status']     = '1';
				$data['message']  	= 'Product Data Get Successfully';
				$data['data']       = $result;
				$data['subcat']     = $sub_cate;
				$data['Image']  	= $all_image;
				$data['product_variant']  = $product_variant;
			}
			else
			{
				$data['Status']     = '0';
				$data['message']  	= 'Data Not Found';
				$data['data']     	= array();
			}
		}
		else
		{
			$result     		= $this->product_model->get_by_all_product();
			if(count($result) > 0)
			{
				$data['Status']     = '1';
				$data['message']  	= 'User Data Get Successfully';
				$data['data']       = $result;
			}
			else
			{
				$data['Status']     = '0';
				$data['message']  	= 'Data Not Found';
				$data['data']     	= array();
			}
		}
		
 		echo json_encode($data);
	}

	public function product_added()
	{	
	
		$iProductId 						= $_POST['iProductId'];
		
	    $data['vProductName']              	= $_POST['vProduct'];
	    $data['iDescription']              	= $_POST['tDescription'];
	    $data['tMoreInformation']           = $_POST['tMoreinformation'];
        $data['iCategoryId']       	   		= $_POST['iCategoryId'];
        $data['iSubcategoryId']       	    = $_POST['iSubcategoryId'];
		$data['eStatus']            		= $_POST['eStatus'];
		$data['vHomePageDisplay']           = $_POST['vHomePageDisplay'];
        $data['dtAddedDate']            	= date("Y-m-d h:i:s");

        $all_image = array();

		if($iProductId=="")
		{
			
			$last_id = $this->product_model->add($data);
		
			if($last_id!="")
			{
				$price 						= $_POST['price'];
				$Qty 						= $_POST['Qty'];
				$sku 						= $_POST['sku'];
				$OptionName 				= $_POST['OptionName'];
				$color 						= $_POST['color'];
				$VariantsId 				= $_POST['iVariantId'];
				
				for($i=0;$i<count($price);$i++)
				{
					$datao['iProductId'] 	= $last_id;
					$datao['vPrice']        = $price[$i];
					$datao['vQty']        	= $Qty[$i];
					$datao['vSku']        	= $sku[$i];
					$datao['iVariantId'] 	= $VariantsId;
					$datao['iOptionId']  	= $OptionName[$i];
					$datao['vColor']  	   	= $color[$i];
					$datao['dtAddedDate'] 	= date("Y-m-d h:i:s");

					$product_variantId = $this->product_model->add_product_variants($datao);
				}
				if($_FILES['vImage']['name'] != "")
				{
					for($i=0; $i<count($_FILES['vImage']['name']); $i++)
					{
						if($_FILES['vImage']['type'][$i] == 'image/jpg'){
							$ext = ".jpg";
						} else if($_FILES['vImage']['type'][$i] == 'image/jpeg'){
							$ext = ".jpeg";
						} else if($_FILES['vImage']['type'][$i] == 'image/png'){
							$ext = ".png";
						}else if($_FILES['vImage']['type'][$i] == 'image/gif'){
							$ext = ".gif";
						}else if($_FILES['vImage']['type'][$i] == 'image/webp'){
							$ext = ".webp";
						}
						
						
						$time = time().'_'.$i;
					    $image = $time.$ext;
						
						$tmp_name 	= $_FILES["vImage"]["tmp_name"][$i];
						$base_path 	= $this->config->item('base_path');
						$directory 	= $base_path."/pramesh/backend/image/Product/";
						$save_path 	= base_url("/image/Product/");
						
						mkdir($directory, 0777, TRUE);
						$p = $directory.$image;
						move_uploaded_file($tmp_name, $p);
						$path = $save_path.'/'.$image;

						if($i <= 1)
						{
							$datas['vType'] = '1';
						}
						else
						{
						     $datas['vType'] = '0';
						}
						$datas['iProductId'] = $last_id;
						$datas['vImage']     = $path;
						$imageid = $this->product_model->image_add($datas);
					}
				}

			}

			if($last_id)
			{
				$data = array();
				$data['Status'] 		= '0';
				$data['message']  		= 'Product Created Successfully';
			}
			else
			{
				$data = array();
				$data['Status'] 		= '1';
				$data['message']  		= 'Product Not Create Please Try!';
			}
		}
		else
		{
			if($iProductId!="")
			{
				$price 						= $_POST['price'];
				$Qty 						= $_POST['Qty'];
				$sku 						= $_POST['sku'];
				$OptionName 				= $_POST['OptionName'];
				$VariantsId 				= $_POST['iVariantId'];
				
				for($i=0;$i<count($price);$i++)
				{
					$datao['iProductId'] 	= $iProductId;
					$datao['vPrice']        = $price[$i];
					$datao['vQty']        	= $Qty[$i];
					$datao['vSku']        	= $sku[$i];
					$datao['iVariantId'] 	= $VariantsId;
					$datao['iOptionId']  	= $OptionName[$i];
					$datao['dtAddedDate'] 	= date("Y-m-d h:i:s");

					$product_variantId = $this->product_model->add_product_variants($datao);
				}

			}

			$where = array('iProductId'=>$iProductId);
			
			$result   = $this->product_model->update($where,$data);
			if($result)
			{
				$data = array();
				$data['Status'] 		= '0';
				$data['message']  		= 'Product Updated  Successfully';
			}
		}
		
		echo json_encode($data);
		exit;

	}

	public function product_delete()
	{
		$iProductId  = $this->input->post('iProductId');
		$this->product_model->delete_by_id($iProductId);
	    $this->product_model->delete_by_image($iProductId);
	    $this->product_model->delete_by_product_variants($iProductId);

		
		$data['Status']     = '0';
		$data['message']  	= 'Product Deleted Successfully';
		echo json_encode($data);
	
	}
	public function product_image_delete()
	{
		$iImageId  = $this->input->post('iImageId');
	
		$id = $this->product_model->delete_by_image_id($iImageId);
		
		$data['Status']     = '0';
		$data['message']  	= 'Image Deleted Successfully';
		echo json_encode($data);	
	}

	public function get_variants_wise_option()
	{
		$iVariantsId = $_GET['iVariantsId'];
		if($_SERVER['REQUEST_METHOD']=='GET' && $iVariantsId!="")
		{
			$result  = $this->variants_model->get_by_variants_wise_option($iVariantsId);

			if(count($result) > 0)
			{
				$data['Status']     = '1';
				$data['message']  	= 'Option Get Successfully';
				$data['data']       = $result;
			}
			else
			{
				$data['Status']     = '0';
				$data['message']  	= 'Data Not Found';
				$data['data']     	= array();
			}

			echo json_encode($data);
		}
	}
	public function product_image_add()
	{
		$iProductId 						= $_POST['iProductId'];
		
		if($_FILES['vImage']['name'] != "")
		{
			for($i=0; $i<count($_FILES['vImage']['name']); $i++)
			{
				if($_FILES['vImage']['type'][$i] == 'image/jpg'){
					$ext = ".jpg";
				} else if($_FILES['vImage']['type'][$i] == 'image/jpeg'){
					$ext = ".jpeg";
				} else if($_FILES['vImage']['type'][$i] == 'image/png'){
					$ext = ".png";
				}else if($_FILES['vImage']['type'][$i] == 'image/gif'){
					$ext = ".gif";
				}else if($_FILES['vImage']['type'][$i] == 'image/webp'){
					$ext = ".webp";
				}
				
				$time = time().'_'.$i;
				$image = $time.$ext;
				
				$tmp_name 	= $_FILES["vImage"]["tmp_name"][$i];
				$base_path 	= $this->config->item('base_path');
				$directory 	= $base_path."/pramesh/backend/image/Product/";
				$save_path 	= base_url("/image/Product/");
				
				mkdir($directory, 0777, TRUE);
				$p = $directory.$image;
				move_uploaded_file($tmp_name, $p);
				$path = $save_path.'/'.$image;

				$datas['iProductId'] = $iProductId;
				$datas['vImage']     = $path;
				$imageid = $this->product_model->image_add($datas);
			}

			$data = array();
			$data['Status'] 		= '0';
			$data['message']  		= 'Product Image Added Successfully';
			
			echo json_encode($data);
			exit;	
		}

		
		

	}
	// **********************************************************CATEGORY********************************************
	public function all_category_get()
	{
		$iCategoryId = $_GET['iCategoryId'];
		if($_SERVER['REQUEST_METHOD']=='GET' && $iCategoryId!="")
		{
			$result  = $this->category_model->get_by_id($iCategoryId);
			if(count($result) > 0)
			{
				$data['Status']     = '1';
				$data['message']  	= 'Category Data Get Successfully';
				$data['data']       = $result;
			}
			else
			{
				$data['Status']     = '0';
				$data['message']  	= 'Data Not Found';
				$data['data']     	= array();
			}
		}
		else
		{
			$result     		= $this->category_model->get_by_all_category();
			if(count($result) > 0)
			{
				$data['Status']     = '1';
				$data['message']  	= 'Category Data Get Successfully';
				$data['data']       = $result;
			}
			else
			{
				$data['Status']     = '0';
				$data['message']  	= 'Data Not Found';
				$data['data']     	= array();
			}
		}
 		echo json_encode($data);
	}
	public function delete_category()
	{
		$iCategoryId  = $this->input->post('iCategoryId');
	
		$id = $this->category_model->delete_by_id($iCategoryId);
		
		$data['Status']     = '0';
		$data['message']  	= 'Category Deleted Successfully';
			
		echo json_encode($data);
	}

	public function category_add()
	{	
		
		$iCategoryId = $_POST['iCategoryId'];

	    $data['vTitle']              	= $_POST['vTitle'];
        $data['vProductType']           = $_POST['ProductType'];
        $data['dtAddedDate']            = date("Y-m-d h:i:s");
        $data['eStatus']            	= $_POST['eStatus'];


	    if($_FILES['vImage']['name'] != "")
        {

            if($_FILES['vImage']['type'] == 'image/jpg'){
                $ext = ".jpg";
            } else if($_FILES['vImage']['type'] == 'image/jpeg'){
                $ext = ".jpeg";
            } else if($_FILES['vImage']['type'] == 'image/png'){
                $ext = ".png";
            }else if($_FILES['vImage']['type'] == 'image/webp'){
                $ext = ".webp";
            }
			

            $image = time().$ext;
			$tmp_name = $_FILES["vImage"]["tmp_name"];
            $base_path = $this->config->item('base_path');
		
             $directory = $base_path."/pramesh/backend/image/category/";
		
            $save_path = base_url("/image/category/");
            
            mkdir($directory, 0777, TRUE);

            $p = $directory.$image;
			move_uploaded_file($tmp_name, $p);
        
            $data['vImage'] =  $save_path.'/'.$image;
        }
		
		if($iCategoryId=="")
		{
			$result   = $this->category_model->add($data);
			if($result)
			{
				$data = array();
				$data['Status'] 		= '0';
				$data['message']  		= 'Category Added Successfully';
			}
			else
			{
				$data = array();
				$data['Status'] 		= '1';
				$data['message']  		= 'Category Not Added Please Try!';
			}
		}
		else
		{
			$where = array('iCategoryId'=>$iCategoryId);
			$result   = $this->category_model->update($where,$data);
			if($result)
			{
				$data = array();
				$data['Status'] 		= '0';
				$data['message']  		= 'category Updated  Successfully';
			}
		}
		
		echo json_encode($data);
		exit;

	}
    // ***********************************************SUB CATEGORY*********************************
	public function get_category()
	{
		$iCategoryId = $_GET['iCategoryId'];

		if($_SERVER['REQUEST_METHOD']=='GET' && $iCategoryId!='')
		{
			$result     		= $this->category_model->get_by_all_subcategory_data($iCategoryId);
			

			if(count($result) > 0)
			{
				$data['Status']     = '1';
				$data['message']  	= 'Category Data Get Successfully';
				$data['data']       = $result;
			}
			else
			{
				$data['Status']     = '0';
				$data['message']  	= 'Data Not Found';
				$data['data']     	= array();
			}
		}
		else
		{
			$result     		= $this->category_model->get_by_all_category();
			if(count($result) > 0)
			{
				$data['Status']     = '1';
				$data['message']  	= 'Image Content Data Get Successfully';
				$data['data']       = $result;
			}
			else
			{
				$data['Status']     = '0';
				$data['message']  	= 'Data Not Found';
				$data['data']     	= array();
			}
		}

		
		
 		echo json_encode($data);
	}
	public function subcategory_add()
	{	
		
		$iSubcategoryId = $_POST['iSubcategoryId'];

	    $data['vSubTitle']              	= $_POST['vTitle'];
        $data['vProductType']           		= $_POST['ProductType'];
        $data['dtAddedDate']            	= date("Y-m-d h:i:s");
        $data['eStatus']            		= $_POST['eStatus'];

		if($iSubcategoryId=="")
		{	
			$data['iCategoryId']              	= $_POST['iCategoryId'];
			$result   = $this->category_model->sub_add($data);
			if($result)
			{
				$data = array();
				$data['Status'] 		= '0';
				$data['message']  		= 'SubCategory Added Successfully';
			}
			else
			{
				$data = array();
				$data['Status'] 		= '1';
				$data['message']  		= 'SubCategory Not Added Please Try!';
			}
		}
		else
		{

			$where = array('iSubcategoryId'=>$iSubcategoryId);

			$result   = $this->category_model->update_sub($where,$data);
			if($result)
			{
				$data = array();
				$data['Status'] 		= '0';
				$data['message']  		= 'Sub Category Updated  Successfully';
			}
		}
		
		echo json_encode($data);
		exit;

	}
	public function all_subcategory_get()
	{
	
		$iSubcategoryId = $_GET['iSubcategoryId'];
		if($_SERVER['REQUEST_METHOD']=='GET' && $iSubcategoryId!="")
		{
			$result  = $this->category_model->get_by_sub_id($iSubcategoryId);
			if(count($result) > 0)
			{
				$data['Status']     = '1';
				$data['message']  	= 'Sub Category Data Get Successfully';
				$data['data']       = $result;
			}
			else
			{
				$data['Status']     = '0';
				$data['message']  	= 'Data Not Found';
				$data['data']     	= array();
			}
		}
		else
		{
			$result     		= $this->category_model->get_by_all_subcategory();
			if(count($result) > 0)
			{
				$data['Status']     = '1';
				$data['message']  	= 'Sub Category Data Get Successfully';
				$data['data']       = $result;
			}
			else
			{
				$data['Status']     = '0';
				$data['message']  	= 'Data Not Found';
				$data['data']     	= array();
			}
		}
 		echo json_encode($data);
	}
	public function delete_subcategory()
	{
		$iSubcategoryId  = $this->input->post('iSubcategoryId');
	
		$id = $this->category_model->delete_by_sub_id($iSubcategoryId);
		
		$data['Status']     = '0';
		$data['message']  	= 'Sub Category Deleted Successfully';
			
		echo json_encode($data);
	}
	public function order()
	{	
		$iProductId = $_POST['iProductId'];
		$vOrderQty  = $_POST['vOrderQty'];

		$result  	  = $this->product_model->get_by_id($iProductId);

		if(count($result) > 0)
		{
			$ProductQty = $result->vQty;

			if($ProductQty >= $vOrderQty)
			{
				$UpdateQty 				= $ProductQty - $vOrderQty;
				$Product_upd['vQty'] 	= $UpdateQty;
				$where = array('iProductId'=>$iProductId);
				$product_update   = $this->product_model->update($where,$Product_upd);

				$data['iProductId']              	= $iProductId;
				$data['vTransactionId']             = $_POST['vTransactionId'];
				$data['iOrderUserId']       	   	= $_POST['iOrderUserId'];
				$data['vOrderQty']       	  		= $vOrderQty;
				$data['vOrderAmount']       	   	= $_POST['vOrderAmount'];
				$data['tOrderShipAddress1']       	= $_POST['tOrderShipAddress1'];
				$data['tOrderShipAddress2']       	= $_POST['tOrderShipAddress2'];
				$data['vOrderState']       	    	= $_POST['vOrderState'];
				$data['vOrderCity']       	    	= $_POST['vOrderCity'];
				$data['vOrderZip']       	   	 	= $_POST['vOrderZip'];
				$data['vOrderCountry']            	= $_POST['vOrderCountry'];
				$data['vOrderPhone']            	= $_POST['vOrderPhone'];
				$data['vOrderEmail']            	= $_POST['vOrderEmail'];
				$data['dtAddedDate']            	= date("Y-m-d h:i:s");

				$Product_add   = $this->order_model->add($data);
	
				if($Product_add)
				{
					$data = array();
					$data['Status'] 		= '0';
					$data['message']  		= 'Product Created Successfully';
				}
				else
				{
					$data = array();
					$data['Status'] 		= '1';
					$data['message']  		= 'Product Not Create Please Try!';
				}

			}
			else
			{
				$data = array();
				$data['Status'] 		= '1';
				$data['message']  		= 'Stock Not Available';
			}

		}
		else
		{
			$data = array();
			$data['Status'] 		= '1';
			$data['message']  		= 'Stock Not Available';
		}

		echo json_encode($data);
		exit;
	

	}
	public function get_all_order()
	{
		$result  	  = $this->order_model->get_by_all_order();

		if($result)
		{
			$data = array();
			$data['Status'] 		= '0';
			$data['message']  		= 'Order List Successfully';
			$data['data']  		    = $result;
		}
		else
		{
			$data = array();
			$data['Status'] 		= '1';
			$data['message']  		= 'Record Not Found!';
		}

		echo json_encode($data);
		exit;


	}

	// **********************************************************VARIANTS********************************************
	public function all_variants_get()
	{
		$iVariantId = $_GET['iVariantId'];
		if($_SERVER['REQUEST_METHOD']=='GET' && $iVariantId!="")
		{
			$result  = $this->variants_model->get_by_id($iVariantId);
			if(count($result) > 0)
			{
				$data['Status']     = '1';
				$data['message']  	= 'Variants Data Get Successfully';
				$data['data']       = $result;
			}
			else
			{
				$data['Status']     = '0';
				$data['message']  	= 'Data Not Found';
				$data['data']     	= array();
			}
		}
		else
		{
			$result     		= $this->variants_model->get_by_all_variants();
			if(count($result) > 0)
			{
				$data['Status']     = '1';
				$data['message']  	= 'Variants Data Get Successfully';
				$data['data']       = $result;
			}
			else
			{
				$data['Status']     = '0';
				$data['message']  	= 'Data Not Found';
				$data['data']     	= array();
			}
		}
 		echo json_encode($data);
	}
	public function variants_add()
	{	
		
		$iVariantId = $_POST['iVariantId'];

	    $data['vLabel']              	= $_POST['vLabel'];
        $data['eStatus']            	= $_POST['eStatus'];
		$data['dtAddedDate']            = date("Y-m-d h:i:s");

		if($iVariantId=="")
		{
			$result   = $this->variants_model->add($data);
			if($result)
			{
				$data = array();
				$data['Status'] 		= '0';
				$data['message']  		= 'Variants Name Added Successfully';
			}
			else
			{
				$data = array();
				$data['Status'] 		= '1';
				$data['message']  		= 'Variants Name Not Added Please Try!';
			}
		}
		else
		{
			$where = array('iVariantId'=>$iVariantId);
			$result   = $this->variants_model->update($where,$data);
			if($result)
			{
				$data = array();
				$data['Status'] 		= '0';
				$data['message']  		= 'Variants Updated  Successfully';
			}
		}
		
		echo json_encode($data);
		exit;

	}
	public function delete_variants()
	{
		$iVariantId  = $this->input->post('iVariantId');
	
		$id = $this->variants_model->delete_by_id($iVariantId);
		
		$data['Status']     = '0';
		$data['message']  	= 'Variants Name Deleted Successfully';
			
		echo json_encode($data);
	}
	// **********************************************************VARIANTS OPTION********************************************
	public function all_option_get()
	{
	
		$iOptionId = $_GET['iOptionId'];
		if($_SERVER['REQUEST_METHOD']=='GET' && $iOptionId!="")
		{
			$result  = $this->variants_model->get_by_option_id($iOptionId);
			if(count($result) > 0)
			{
				$data['Status']     = '1';
				$data['message']  	= 'Sub Category Data Get Successfully';
				$data['data']       = $result;
			}
			else
			{
				$data['Status']     = '0';
				$data['message']  	= 'Data Not Found';
				$data['data']     	= array();
			}
		}
		else
		{
			$result     		= $this->variants_model->get_by_all_variants_option();
			if(count($result) > 0)
			{
				$data['Status']     = '1';
				$data['message']  	= 'Variants Option Data Get Successfully';
				$data['data']       = $result;
			}
			else
			{
				$data['Status']     = '0';
				$data['message']  	= 'Data Not Found';
				$data['data']     	= array();
			}
		}
 		echo json_encode($data);
	}
	public function get_variants()
	{
		$iCategoryId = $_GET['iCategoryId'];

		if($_SERVER['REQUEST_METHOD']=='GET' && $iCategoryId!='')
		{
			$result     		= $this->category_model->get_by_all_subcategory_data($iCategoryId);
			
			if(count($result) > 0)
			{
				$data['Status']     = '1';
				$data['message']  	= 'Category Data Get Successfully';
				$data['data']       = $result;
			}
			else
			{
				$data['Status']     = '0';
				$data['message']  	= 'Data Not Found';
				$data['data']     	= array();
			}
		}
		else
		{
			$result     		= $this->variants_model->get_by_all_variants();
			if(count($result) > 0)
			{
				$data['Status']     = '1';
				$data['message']  	= 'Variants Data Get Successfully';
				$data['data']       = $result;
			}
			else
			{
				$data['Status']     = '0';
				$data['message']  	= 'Data Not Found';
				$data['data']     	= array();
			}
		}

		
		
 		echo json_encode($data);
	}
	public function option_add()
	{	
		$iOptionId = $_POST['iOptionId'];

	   
		$data['vOptions']         	= $_POST['vOptions'];  
        $data['eStatus']     		= $_POST['eStatus'];
		$data['dtAddedDate']      	= date("Y-m-d h:i:s");

		if($iOptionId=="")
		{
			$data['iVariantId']       	= $_POST['iVariantId'];
			$result   = $this->variants_model->option_add($data);
			if($result)
			{
				$data = array();
				$data['Status'] 		= '0';
				$data['message']  		= 'Variants Option Added Successfully';
			}
			else
			{
				$data = array();
				$data['Status'] 		= '1';
				$data['message']  		= 'Variants Option Not Added Please Try!';
			}
		}
		else
		{
			$where = array('iOptionId'=>$iOptionId);
			$result   = $this->variants_model->update_option($where,$data);
			if($result)
			{
				$data = array();
				$data['Status'] 		= '0';
				$data['message']  		= 'Variants Option Updated  Successfully';
			}
		}
		
		echo json_encode($data);
		exit;

	}
	public function delete_option()
	{
		$iOptionId  = $this->input->post('iOptionId');
	
		$id = $this->variants_model->delete_by_option_id($iOptionId);
		
		$data['Status']     = '0';
		$data['message']  	= 'Variants Option  Deleted Successfully';
			
		echo json_encode($data);
	}

	public function product_variyant_delete()
	{
		$iProduct_variantsId  = $this->input->post('iProduct_variantsId');
	
		$id = $this->variants_model->delete_by_variants_id($iProduct_variantsId);
		
		$data['Status']     = '0';
		$data['message']  	= 'Variants Option  Deleted Successfully';
			
		echo json_encode($data);

	}
	// **********************************************************FRONT*****************************************
    
	public function banner()
	{
		$result     		= $this->content_model->get_by_all_banner_front();
		if(count($result) > 0)
		{
			$data['Status']     = '1';
			$data['message']  	= 'Banner Data Get Successfully';
			$data['data']       = $result;
		}
		else
		{
			$data['Status']     = '0';
			$data['message']  	= 'Data Not Found';
			$data['data']     	= array();
		}
		
 		echo json_encode($data);
	}

	public function mini_banner()
	{
		$result     		= $this->content_model->get_by_all_mini_banner_front();
		if(count($result) > 0)
		{
			$data['Status']     = '1';
			$data['message']  	= 'Banner Data Get Successfully';
			$data['data']       = $result;
		}
		else
		{
			$data['Status']     = '0';
			$data['message']  	= 'Data Not Found';
			$data['data']     	= array();
		}
		
 		echo json_encode($data);
	}
	public function first_image()
	{
		$result     		= $this->content_model->get_by_all_first_image();
		if(count($result) > 0)
		{
			$data['Status']     = '1';
			$data['message']  	= 'Image Data Get Successfully';
			$data['data']       = $result;
		}
		else
		{
			$data['Status']     = '0';
			$data['message']  	= 'Data Not Found';
			$data['data']     	= array();
		}
		
 		echo json_encode($data);
	}
	public function second_image()
	{
		$result     		= $this->content_model->get_by_all_second_image();
		if(count($result) > 0)
		{
			$data['Status']     = '1';
			$data['message']  	= 'Image Data Get Successfully';
			$data['data']       = $result;
		}
		else
		{
			$data['Status']     = '0';
			$data['message']  	= 'Data Not Found';
			$data['data']     	= array();
		}
		
 		echo json_encode($data);
	}
	public function third_image()
	{
		$result     		= $this->content_model->get_by_all_third_image();
		if(count($result) > 0)
		{
			$data['Status']     = '1';
			$data['message']  	= 'Image Data Get Successfully';
			$data['data']       = $result;
		}
		else
		{
			$data['Status']     = '0';
			$data['message']  	= 'Data Not Found';
			$data['data']     	= array();
		}
		
 		echo json_encode($data);
	}
	public function homepage_product()
	{
		$result     		= $this->product_model->get_by_homepage_product();
		if(count($result) > 0)
		{
			$data['Status']     = '1';
			$data['message']  	= 'Product Data Get Successfully';
			$data['data']       = $result;
		}
		else
		{
			$data['Status']     = '0';
			$data['message']  	= 'Data Not Found';
			$data['data']     	= array();
		}
		
 		echo json_encode($data);
	}
	public function main_product_listing()
	{
		$result     		= $this->product_model->get_by_main_product();
		if(count($result) > 0)
		{
			$data['Status']     = '1';
			$data['message']  	= 'Product Data Get Successfully';
			$data['data']       = $result;
		}
		else
		{
			$data['Status']     = '0';
			$data['message']  	= 'Data Not Found';
			$data['data']     	= array();
		}
		
 		echo json_encode($data);
	}
	public function product_listing_image()
	{
	    $result     		= $this->content_model->get_by_product_listing_image();
		if(count($result) > 0)
		{
			$data['Status']     = '1';
			$data['message']  	= 'Image Data Get Successfully';
			$data['data']       = $result;
		}
		else
		{
			$data['Status']     = '0';
			$data['message']  	= 'Data Not Found';
			$data['data']     	= array();
		}
		
 		echo json_encode($data);	
	}
	public function header()
	{
	   $result     		= $this->category_model->get_by_front_category();
		if(count($result) > 0)
		{
			$data['Status']     = '1';
			$data['message']  	= 'Image Data Get Successfully';
			$data['data']       = $result;
		}
		else
		{
			$data['Status']     = '0';
			$data['message']  	= 'Data Not Found';
			$data['data']     	= array();
		}
		
 		echo json_encode($data); 
	}
	public function product_listing()
	{	
		$category_price 	= $_GET['category'];
		$SortByFilter   	= explode("@@",$_GET['SortByFilter']);
		$subcate_andprice 	= explode("@",$_GET['SubCategoryId']);
		$Category 			= explode("@",$_GET['iCategory']);

		if(!empty($subcate_andprice[0]))
		{
			$SubCategoryId 	= $subcate_andprice[0];
		}

		if(!empty($subcate_andprice[1]))
		{
			$Price 			= $subcate_andprice[1];
		}

		if(!empty($SortByFilter[0]))
		{
			$OrderBy = $SortByFilter[0];
		}
		
		if(!empty($SortByFilter[1]))
		{
			$SubCategoryId = $SortByFilter[1];
		}

		if(!empty($Category[0]))
		{
			$iCategoryId = $Category[0];
		}
		if(!empty($Category[1]))
		{
			$Price 	   = $Category[1];
		}

		$result   = $this->product_model->get_by_all_product_listing($SubCategoryId,$Price,$OrderBy,$iCategoryId);


		$countArray = array();
		foreach($result as $value)
		{	
			$imagecount = $value->image;
			if(count($imagecount) > 0)
			{
				array_push($countArray,$value->iProductId);
			} 
		}


		if(count($result) > 0)
		{
			$data['Status']     = '1';
			$data['message']  	= 'Product Data Get Successfully';
			$data['data']       = $result;
			$data['product_count'] = count($countArray);
		}
		else
		{
			$data['Status']     = '0';
			$data['message']  	= 'Data Not Found';
			$data['data']     	= array();
		}
		
 		echo json_encode($data);
	}
	public function single_product_get()
	{
		$idorprice  = explode("@@",$this->input->get('iProductId'));
		$iProductId = $idorprice[0];
		$vPrice     = $idorprice[1];
		

		$result     		= $this->product_model->get_by_product_id_with_image($iProductId,$vPrice);
		if(count($result) > 0)
		{
			$data['Status']     = '1';
			$data['message']  	= 'Single Data Get Successfully';
			$data['data']       = $result;
		}
		else
		{
			$data['Status']     = '0';
			$data['message']  	= 'Data Not Found';
			$data['data']     	= array();
		}
		
 		echo json_encode($data);
	}
	public function product_listingpage_data_show()
	{
		$iImageId = $_POST['iImageId'];
		$type = $_POST['type'];

		if(!empty($iImageId))
		{	
			if($type=='Added')
			{
				$data['vType'] = '0'; 
			}
			else
			{
				$data['vType'] = '1';
			}
			
			$where = array('iImageId'=>$iImageId);
		
			$result   = $this->product_model->update_product_image($where,$data);
			if($result)
			{
				$data = array();
				$data['Status'] 		= '0';
				if($type=='Added')
				{
					$data['message']  		= 'Product Front Side Remove Successfully';
				}
				else
				{
					$data['message']  		= 'Product Front Side Added Successfully';
				}
			}
			
			echo json_encode($data);
			exit;
		}
		
	}
	// *********************************Register******************************
	public function register()
	{	
	    $data['vFirstName']              	= $_POST['vFirstName'];
        $data['vLastName']       			= $_POST['vLastName'];
        $data['vEmail']           			= $_POST['vEmail'];
        $data['vPassword']           		= md5($_POST['vPassword']);
        $data['dtAddedDate']            	= date("Y-m-d h:i:s");
        $data['dtUpdatedDate']            	= date("Y-m-d h:i:s");
        $data['eStatus']            		= 'Inactive';
		
		$result   = $this->register_model->add($data);
		if($result)
		{
			$data = array();
			$data['Status'] 		= '0';
		}
		else
		{
			$data = array();
			$data['Status'] 		= '1';
		}
		echo json_encode($data);
		exit;
	}

	public function email_varify()
	{	
        $vEmail           			= $_POST['vEmail'];
		$result   = $this->register_model->get_by_email($vEmail);

	
		if($result==1)
		{
			$data = array();
			$data['Status'] 		= '1';
		}
		else
		{
			$data = array();
			$data['Status'] 		= '0';
		}
		
		echo json_encode($data);
		exit;

	}

	public function login_user()
	{	
        $vEmail           			= $_POST['vEmail'];
        $vPassword           		= md5($_POST['vPassword']);

		$result   = $this->register_model->get_by_email_password($vEmail,$vPassword);

		if(count($result) > 0)
		{
			if($result->eStatus=='Active')
			{
				$data = array();
				$data['Status'] 		= '0';
				$data['message'] 		= 'Login Successfully';
				$data['data']  			= $result;
			}
			else
			{
				$data = array();
				$data['Status'] 		= '2';
				$data['message'] 		= 'Email Address Not Activated!';
			}
		}
		else
		{
			$data = array();
			$data['Status'] 		= '1';
			$data['message'] 		= 'Email Password Incorrect!';
		}

		echo json_encode($data);
		exit;

	}

	public function addtocart()
	{	
	
		
	    $data['iProductId']              	= $_POST['iProductId'];
        $data['vProductName']       		= $_POST['vProductName'];
        $data['vPrice']           			= $_POST['vPrice'];
		$data['vCookie'] 					= $_POST['vCookie'];
        $data['vImage']           			= $_POST['vImage'];
        $data['vQty']            			= $_POST['vQty'];
		$data['dtAddedDate']            	= date("Y-m-d h:i:s");
		
	
		$result   = $this->register_model->add_to_cart($data);
		if($result)
		{
			$data = array();
			$data['Status'] 		= '0';
		}
		else
		{
			$data = array();
			$data['Status'] 		= '1';
		}
		echo json_encode($data);
		exit;
	}

}