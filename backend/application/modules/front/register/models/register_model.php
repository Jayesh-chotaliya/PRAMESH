<?php
defined('BASEPATH') || exit('No direct script access allowed');


class Register_model extends CI_Model
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

    var $table                      = 'user';
    var $table_addtocart            = 'addtocart';
    

    public function __construct()
    {
        parent::__construct();
    }
    // ***************************USE Function****************************************
    public function add($data)
    {
        $this->db->insert($this->table, $data);
        return $this->db->insert_id();
    }
    public function add_to_cart($data)
    {
        $this->db->insert($this->table_addtocart, $data);
        return $this->db->insert_id();
    }

    public function get_by_email($vEmail)
    { 
        $this->db->from($this->table);
        $this->db->where('vEmail',$vEmail);
        $query=$this->db->get();
        $data = $query->num_rows();
        return $data;
    }
    public function get_by_email_password($vEmail,$vPassword)
    { 
    
        $this->db->from($this->table);
        $this->db->where('vEmail',$vEmail);
        $this->db->where('vPassword',$vPassword);
        $query=$this->db->get();
        $data = $query->row();
        return $data;
    }
     // ***************************USE Function END****************************************
    
    // public function get_by_all_category()
    // {   
    //     $this->db->from($this->table);
    //     $this->db->order_by("iCategoryId", "desc");
    //     $query=$this->db->get();
    //     $data = $query->result();
    //     return $data;
    // }
    // public function get_by_all_subcategory()
    // {   
    //     $this->db->from($this->table_subcategory.' t');
    //     $this->db->join($this->table." t2", 't.iCategoryId = t2.iCategoryId');
    //     $this->db->order_by("iSubcategoryId", "desc");
    //     $query=$this->db->get();
    //     $data = $query->result();
    //     return $data;
    // }
    
    // public function delete_by_id($iCategoryId)
    // {
    //     $this->db->where('iCategoryId', $iCategoryId);
    //     $this->db->delete($this->table);
    // }
    // public function delete_by_sub_id($iSubcategoryId)
    // {
    //     $this->db->where('iSubcategoryId', $iSubcategoryId);
    //     $this->db->delete($this->table_subcategory);
    // }

    // public function update($where, $data)
    // {
    //     $this->db->update($this->table, $data, $where);
    //     return $this->db->affected_rows();
    // }

    // public function update_sub($where, $data)
    // {
    //     $this->db->update($this->table_subcategory, $data, $where);
    //     return $this->db->affected_rows();
    // }

    
  

}