<?php
defined('BASEPATH') || exit('No direct script access allowed');


class Product_model extends CI_Model
{
    public $table_name;
    public $table_alias;
    public $primary_key;
    public $primary_alias;
    public $grid_fields;
    public $join_tables;
    public $extra_cond;
    public $groupby_cond;
    public $orderby_cond;
    public $unique_type;
    public $unique_fields;
    public $switchto_fields;
    public $default_filters;
    public $search_config;
    public $relation_modules;
    public $deletion_modules;
    public $print_rec;
    public $multi_lingual;
    public $physical_data_remove;
    public $listing_data;
    public $rec_per_page;
    public $message;

    var $table                   = 'product';
    var $table_subcategory       = 'subcategory';
    var $table_product_image     = 'product_image';
    var $table_product_variants  = 'product_variants';
    var $table_variants_options  = 'variants_options';
    var $table_category          = 'category';

    public function __construct()
    {
        parent::__construct();
    }
    public function add($data)
    {
        $this->db->insert($this->table, $data);
        return $this->db->insert_id();
    }
    public function add_product_variants($datao)
    {
        $this->db->insert($this->table_product_variants, $datao);
        return $this->db->insert_id();
    }

    
    public function image_add($datas)
    {
        $this->db->insert($this->table_product_image, $datas);
        return $this->db->insert_id();
    }

    
    public function get_by_all_product()
    {   
        $this->db->select("t.*,t2.vPrice");
        $this->db->from($this->table.' t');
        $this->db->join($this->table_product_variants.' t2','t.iProductId=t2.iProductId');
        $this->db->group_by("t.iProductId");
        $this->db->order_by("t.iProductId", "desc");
        $query=$this->db->get();
        $data = $query->result();
        foreach($data as $key => $value)
        {
            $this->db->from($this->table_product_image);
            $this->db->where('iProductId',$value->iProductId);
            $this->db->where('vType','1');
            $this->db->limit(1);
            $query=$this->db->get();
            $data[$key]->image = $query->result();
        }
        return $data;
    }
    public function get_by_id($iProductId)
    { 
        $this->db->from($this->table);
        $this->db->where('iProductId',$iProductId);
        $query=$this->db->get();
        $data = $query->row();
        return $data;  
    }

    public function get_by_product_id_with_image($iProductId='',$vPrice='')
    { 
        $this->db->select('t.*,t2.vPrice,t2.vQty,t2.vSku,t2.iVariantId,t2.iOptionId,t2.vColor');
        $this->db->from($this->table.' t');
        $this->db->join($this->table_product_variants.' t2','t.iProductId=t2.iProductId');
        $this->db->where('t2.iProductId',$iProductId);
        $this->db->where('t2.vPrice',$vPrice);
        $this->db->where('t.eStatus','Active');
        $query = $this->db->get();
        $data  = $query->result();

        foreach($data as $key => $value)
        {
            $this->db->from($this->table_product_image);
            $this->db->where('iProductId',$value->iProductId);
            $this->db->limit(4);
            $query=$this->db->get();
            $data[$key]->image = $query->result();
        }
        return $data;  
       
    }
   
    public function get_by_all_product_variyant($iProductId)
    {
        $this->db->select('t1.*,t2.vOptions');
        $this->db->from($this->table_product_variants.' t1');
        $this->db->join($this->table_variants_options.' t2','t1.iOptionId=t2.iOptionId');
        $this->db->where('t1.iProductId',$iProductId);
        $query=$this->db->get();
        $data = $query->result();
        return $data;  
    }
    public function get_by_all_image($iProductId)
    { 
        $this->db->from($this->table_product_image);
        $this->db->where('iProductId',$iProductId);
        $this->db->order_by('vType','DESC');
        $query=$this->db->get();
        $data = $query->result();
        return $data;  
    }


    public function get_by_id_subcategory($iSubcategoryId)
    {
        $this->db->select('t.vSubTitle');
        $this->db->from($this->table_subcategory.' t');
        $this->db->where('t.iSubcategoryId',$iSubcategoryId);
        $query=$this->db->get();
        $data = $query->row();
        return $data;
    }

    public function delete_by_id($iProductId)
    {
        $this->db->where('iProductId', $iProductId);
        $this->db->delete($this->table);
    }
    public function delete_by_image($iProductId)
    {
        $this->db->where('iProductId', $iProductId);
        $this->db->delete($this->table_product_image);
    }

    public function delete_by_product_variants($iProductId)
    {
        $this->db->where('iProductId', $iProductId);
        $this->db->delete($this->table_product_variants);
    }
    
    
    public function delete_by_image_id($iImageId)
    {
        $this->db->where('iImageId', $iImageId);
        $this->db->delete($this->table_product_image);
    }

    public function update($where, $data)
    {
        $this->db->update($this->table, $data, $where);
        return $this->db->affected_rows();
    }

    public function update_product_image($where, $data)
    {
        $this->db->update($this->table_product_image, $data, $where);
        return $this->db->affected_rows();
    }

    

    // ************************************************FRONT****************************
    
    public function get_by_homepage_product()
    { 
        $this->db->select('t.*,t1.vImage,t2.vPrice');
        // $this->db->select('t.*,t1.vImage');
        $this->db->from($this->table. ' t');
        $this->db->join($this->table_product_image.' t1','t.iProductId=t1.iProductId');
        $this->db->join($this->table_product_variants.' t2','t.iProductId=t2.iProductId');
        $this->db->group_by('t.iProductId');
        $this->db->where('t.vHomePageDisplay','1');
        $this->db->where('t.eStatus','Active');
        $this->db->limit(4);
        $query=$this->db->get();
        $data = $query->result();
        return $data;  
    }
    public function get_by_main_product()
    { 
        
        $this->db->from($this->table_category);
        $this->db->where('vProductType','1');
        $this->db->where('eStatus','Active');
        $query=$this->db->get();
        $data = $query->result();
        return $data;  
    }
    public function get_by_all_product_listing($SubCategoryId='',$Price='',$OrderBy='',$iCategoryId='')
    { 
        $Price  = explode("-",$Price);
        $this->db->select('t.*,t2.vPrice');
        $this->db->from($this->table. ' t');
        $this->db->join($this->table_product_variants.' t2','t.iProductId=t2.iProductId');
       
        if(!empty($SubCategoryId))
        {
            $this->db->where('t.iSubcategoryId',$SubCategoryId);
        }

        if(!empty($iCategoryId))
        {
            $this->db->where('t.iCategoryId',$iCategoryId);
        }

        if(!empty($Price[0]) && !empty($Price[1]))
        {
            $this->db->where('t2.vPrice >=',$Price[0]);
            $this->db->where('t2.vPrice <=',$Price[1]);
            if($OrderBy!='HIGHEST' && $OrderBy!='LOWEST')
            {
                $this->db->order_by('t2.vPrice','DESC');
            }
        }
        if($OrderBy=='HIGHEST')
        {
            $this->db->order_by('t2.vPrice','DESC');
        }
        if($OrderBy=='LOWEST')
        {
            $this->db->order_by('t2.vPrice','ASC');
        }
        // $this->db->group_by('t.iProductId');
        $this->db->where('t.eStatus','Active');
        // $this->db->where('t1.vType','1');
        $this->db->where('t2.vPrice !=','');
        $this->db->where('t.vProductName !=','');
        // $this->db->where('t.iProductId','58');
        $query=$this->db->get();
        // echo $this->db->last_query();
        // exit;

        $data = $query->result();
        foreach($data as $key => $value)
        {
            $this->db->from($this->table_product_image);
            $this->db->where('iProductId',$value->iProductId);
            $this->db->where('vType','1');
            $this->db->limit(2);
            $query=$this->db->get();
            $data[$key]->image = $query->result();
        }
        return $data;  
    }

    
}
